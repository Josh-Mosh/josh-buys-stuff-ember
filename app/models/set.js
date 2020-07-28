import Model, { attr } from '@ember-data/model';

export default class SetModel extends Model {
  @attr('string') setId;
  @attr('string') name;
  @attr('string') description;
  @attr('number') pieces;
  @attr('string') age;
  @attr('string') price;
  @attr('string') imgUrl;
  @attr createdAt;
}
