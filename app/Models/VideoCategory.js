'use strict'

const Model = use('Model')

class VideoCategory extends Model {
  video() {
    return this.hasMany('App/Models/Video');
  }
}

module.exports = VideoCategory
