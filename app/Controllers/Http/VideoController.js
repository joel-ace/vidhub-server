'use strict'

const Video = use('App/Models/Video')
const VideoCategory = use('App/Models/VideoCategory')
const { validateAll } = use('Validator')
const { returnValidationErrors, verifyPermission } = use('App/Services/AuthorizationService')

class VideoController {
  async create({ auth, request, params }) {
    const user = await auth.getUser();
    const { title, description, category_id, year, rating, img_url, video_url } = request.all();
    const videoCategoryID = params.id;

    const videoCategory = await VideoCategory.find(videoCategoryID);

    verifyPermission(videoCategory, user);

    const video = new Video();
    video.fill({
      title,
      description,
      category_id,
      year,
      rating,
      img_url,
      video_url,
    });

    await videoCategory.video().save(video);
    return video;
  }

  async uploadImage({ request }) {
    const profilePics = request.file('profile_pics', {
      types: ['image'],
      size: '2mb'
    })

    await profilePics.moveAll(Helpers.tmpPath('uploads'))

    if (!profilePics.movedAll()) {
      return profilePics.errors()
    }
  }
}

module.exports = VideoController
