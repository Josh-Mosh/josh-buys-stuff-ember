import TextField from '@ember/component/text-field';
import { computed, observer } from '@ember/object';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import numeral from 'numeral';
import $ from 'jquery';

export default TextField.extend({

  attributeBindings: ['tabindex', 'disabled'],
  classNameBindings: ['maskType'],
  classNames: ['form-control'],
  rawValue: 0,
  minValue: 0,

  tabindex: computed(function(key, value) {

    let index = this.get('index'),
        section = this.get('section');

    if (arguments.length > 1) {
      return value;
    }

    return `${section}${index}`;

  }),

  cleanedValue: computed('value', 'maskType', function() {
    let value = this.get('value'),
        type = this.get('maskType'),
        maxValue = this.get('maxValue'),
        minValue = this.get('minValue');

    if (type === 'dollars') {
      value = value.replace(/[$,]/g,'');
    } else if (type === 'percent' || type === 'medPercent' || type === 'negativePercent') {
      value = value.replace(/%/g,'');
      value = parseFloat(value) / 100;
    } else if (type === 'whole') {
      value = value.replace(/[,]/g,'');
      value = Math.round(100 * parseFloat(value)) / 100;
    } else {
      value = value.replace(/,/g,'');
    }

    if (isNaN(value) || isEmpty(value)) {
      return 0;
    }

    if (parseFloat(value) > maxValue) {
      return maxValue;
    }

    if (parseFloat(value) < minValue) {
      return minValue;
    }

    return parseFloat(value);
  }),

  updateRawValue: function() {
    let cleaned = this.get('cleanedValue'),
        type = this.get('maskType'),
        masked;

    // if value is deleted, set it to 0?
    if (!this.get('value')) {
      this.set('value', this.maskedValue(0));
    }

    if (isValidInput(this.get('value'), type)) {
      masked = this.maskedValue(this.get('cleanedValue'));
      this.set('value', masked);
      this.set('rawValue', cleaned);
    } else {
      this.set('value', this.maskedValue(this.get('rawValue')));
    }
  },

  focusOut: function() {
    let cleaned = this.get('cleanedValue'),
        index = this.get('index'),
        advanced = this.get('advanced'),
        parentView = this.get('parentView');

    // this._super(...arguments);

    run(() => {
      this.updateRawValue();

      // unique for cascading as we have to update all values from changed index down
      if (advanced) {
        parentView.notifyPropertyChange('enteredAdvanced');
        this.sendAction('action', cleaned, index);
      } else {
        this.sendAction();
      }
    });

  },

  focusIn() {
    this.$()[0].setSelectionRange(0, this.get('value').length);
  },

  updateValue: observer('rawValue', 'maskType', function() {
    let rawValue = this.get('rawValue');
    this.set('value', this.maskedValue(rawValue));
  }),

  handleEnter: function(event) {
    if (event.keyCode === 13) {
      this.$().trigger('blur');
    }
  },

  handleLiveUpdate: function() {
    if (this.get('liveUpdate')) {
      this.updateRawValue();
    }
  },

  keyUp(event) {
    this.handleEnter(event);
    this.handleLiveUpdate();
  },

  isLast: computed('condition', 'index', 'advanced', 'column', 'columns', 'years', function() {
    let condition = this.get('condition'),
        index = this.get('index'),
        multi = this.get('advanced') ? this.get('advanced.isMultiColumn') : false,
        column = this.get('column'),
        columns = this.get('columns') || [],
        currentColumn,
        lastColumn,
        lastIndex = this.get('years') - 1;

    if (multi) {
      currentColumn = columns.indexOf(column);
      lastColumn = columns.length - 1;
      if (currentColumn === lastColumn) {
        return condition ? index === lastIndex : index === 4;
      } else {
        return false;
      }
    }

    return condition ? index === lastIndex : index === 4;
  }),

  keyDown(event) { // handleTab
    if (event.keyCode === 9 && !event.shiftKey) {
      if (this.get('isLast')) {
        this.sendAction('nextHandlerAction');
      } else if (this.get('noTab')) {
        this.$().trigger('blur');
        event.preventDefault();
      }
    }
  },

  didInsertElement: function() {
    let rawValue = this.get('rawValue'),
        placeholder = this.get('placeholder');

    if (rawValue) {
      this.set('value', this.maskedValue(rawValue));
    } else if (!placeholder) {
      this.set('placeholder', this.maskedValue(rawValue));
    }

  },

  // HELPERS
  maskedValue: function(value) {

    // N/A is OK
    if (value === "N/A") {
      return value;
    }

    let maskedValue = value ? parseFloat(value) : 0,
        maskedValueByType = {
          dollars: function() { return numeral(maskedValue).format('($0,0.00)'); },
          percent: function() { return percentMask(maskedValue); },
          negativePercent: function() { return percentMask(maskedValue); },
          numeral: function() { return numeral(maskedValue).format('0,0.0'); },
          plain: function() { return numeral(maskedValue).format('0')},
          medNumeral: function() { return numeral(maskedValue).format('0,0.0[000]'); },
          longNumeral: function() { return numeral(maskedValue).format('0,0.0[00000000]'); },
          whole: function() { return numeral(maskedValue).format('0,0'); }
        },
        type = maskedValueByType[this.get('maskType')] ? this.get('maskType') : 'numeral';

    return maskedValueByType[type]();
  }

});

function percentMask(maskedValue) {
  //multiply by 100
  maskedValue = isNaN(maskedValue) ? 0 : maskedValue * 100;
  let isWhole = maskedValue % 1 === 0;
  return isWhole ? maskedValue + '.0%' : numeral(maskedValue).format('0.00[00]') + '%';
}

function isValidInput(input, type) {
  let isGreaterThanZero = true,
      negativeAllowed = (type === 'negativePercent');

  if (type === 'multiplier') {
    isGreaterThanZero = parseFloat(input, 10) > 0;
  }
  return ((input !== '') && (input.toString().replace(/[0-9,-.$%\s]/g, '').length === 0) && (isGreaterThanZero || negativeAllowed));
}
