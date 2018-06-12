'use strict'

const Schema = use('Schema')

class VideoCategorySchema extends Schema {
  up () {
    this.create('video_categories', (table) => {
      table.increments()
      table.string('title', 255)
      table.string('description', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('video_categories')
  }
}

module.exports = VideoCategorySchema
