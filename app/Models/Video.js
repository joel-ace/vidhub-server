'use strict'

const Model = use('Model')

class Video extends Model {
  videoCategory() {
    return this.belongsTo('App/Models/VideoCategory');
  }

}

module.exports = Video
