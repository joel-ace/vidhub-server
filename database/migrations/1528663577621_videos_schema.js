'use strict'

const Schema = use('Schema')

class VideosSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('title', 255)
      table.string('description', 255)
      table.integer('category_id').unsigned().references('id').inTable('video_categories')
      table.integer('year')
      table.string('rating', 6)
      table.string('img_url', 200)
      table.string('video_url', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideosSchema
