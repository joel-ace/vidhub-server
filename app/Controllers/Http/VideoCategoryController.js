'use strict'

const VideoCategory = use('App/Models/VideoCategory')
const { validateAll } = use('Validator')
const { returnValidationErrors, verifyRegisteredUser, handleResourceNotExists } = use('App/Services/AuthorizationService')

class VideoCategoryController {

  async index({ request, response }) {
    const videoCategories = await VideoCategory.all()

    return { videoCategories }
  }

  async store({ request, response }) {
    const { title, description } = request.all()

    const validation = await validateAll(request.all(), {
      title: 'required|min:3|max:150',
      description: 'required|min:10',
    })
    returnValidationErrors(validation, response)

    const category = await VideoCategory.findBy('title', title)
    verifyRegisteredUser(category, 'a category with this name already exists')

    const newCategory = await VideoCategory.create({ title, description });

    return newCategory;
  }

  async update({ request, response, params }) {
    const { title, description } = request.all()

    const validation = await validateAll(request.all(), {
      title: 'required|min:3|max:150',
      description: 'required|min:10',
    })
    returnValidationErrors(validation, response)

    const videoCategory = await VideoCategory.find(params.id)

    videoCategory.merge(request.only(['title', 'description']))
    await videoCategory.save()

    return {
      videoCategory,
      message: 'video category successfully updated',
    }
  }

  async destroy({ params }) {
    const videoCategory = await VideoCategory.find(params.id);

    handleResourceNotExists(
      videoCategory,
      'video category does not exist or has been previously deleted',
    )

    await videoCategory.delete();

    return {
      videoCategory,
      message: 'video category deleted successfully'
    };
  }
}

module.exports = VideoCategoryController
