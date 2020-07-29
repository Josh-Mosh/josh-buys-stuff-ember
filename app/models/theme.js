import Model, { attr } from '@ember-data/model';

export default class ThemeModel extends Model {
  @attr('string') name;
  @attr('string') logoUrl;
  @attr('string') bgImageUrl;
  @attr('string') fontTheme;

  get hasBgImageUrl() {
    return !!this.bgImageUrl;
  }

  get hasLogoUrl() {
    return !!this.logoUrl;
  }
}
