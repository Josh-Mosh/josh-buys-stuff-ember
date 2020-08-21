import Model, { attr, belongsTo } from '@ember-data/model';

export default class SetModel extends Model {
  @belongsTo('theme') theme;

  @attr('string') setId;
  @attr('string') name;
  @attr('string') description;
  @attr('number') pieces;
  @attr('string') age;
  @attr('string') price;
  @attr('string') imgUrl;
  @attr('string') affiliateLink;
  @attr('boolean', { defaultValue: false }) favorite;
  @attr('boolean', { defaultValue: false }) hidden;
  @attr('string') videoId;
  @attr('date') videoUploaded;
  @attr createdAt;

  get numericalPrice() {
    return parseFloat(this.price || 0);
  }

  get embeddedSrc() {
    return this.videoId ? `https://www.youtube.com/embed/${this.videoId}` : '';
  }

  get hasImage() {
    return !!this.imgUrl;
  }

  get hasVideo() {
    return !!this.videoId;
  }

  get isFavorite() {
    return this.favorite;
  }

  get isHidden() {
    return this.hidden;
  }

  get hasAffiliateLink() {
    return !!this.affiliateLink;
  }
}
