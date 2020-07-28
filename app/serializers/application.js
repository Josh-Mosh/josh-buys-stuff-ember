import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

export default DS.RESTSerializer.extend({
  // payloadKeyFromModelName(modelName) {
  //   return pluralize(modelName);
  // },

  // normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
  //   console.log('normalizeResponse primaryModelClass:', primaryModelClass);
  //   console.log('normalizeResponse payload:', payload);
  //   let newPayload = {};
  //   newPayload[pluralize(primaryModelClass.modelName)] = payload;
  //   return this._super(store, primaryModelClass, newPayload, id, requestType);
  // }
});
