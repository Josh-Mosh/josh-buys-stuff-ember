import Model, { attr } from '@ember-data/model';

export default class SetModel extends Model {
  @attr('string') setId;
  @attr('string') name;
  @attr('string') description;
  @attr('number') pieces;
  @attr('string') age;
  @attr('string') price;
  @attr('string') imgUrl;
  @attr('string') affiliateLink;
  @attr('boolean', { defaultValue: false }) favorite;
  @attr('string') videoId;
  @attr('date') videoUploaded;
  @attr createdAt;

  get hasImage() {
    return !!this.imgUrl;
  }

  get hasVideo() {
    return !!this.videoId;
  }

  get isFavorite() {
    return this.favorite;
  }
}
