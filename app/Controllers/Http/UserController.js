'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const AuthorizationService = use('App/Services/AuthorizationService')

class UserController {

  async login({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token
  }

  async index({ auth, response }) {
    const user = await auth.getUser()

    AuthorizationService.veryfiyAccess(user, 'admin', 'You are not authorized to access this resource');
    const users = await User.all()

    return users
  }

  async store({ request, response }) {
    const { email, password } = request.all()

    const validation = await validateAll(request.all(), {
      email: 'required|email',
      password: 'required|min:6',
    })

    if(validation.fails()) {
      return response.status(400).json(validation.messages());
    }

    const newUser = await User.findBy('email', email)
    AuthorizationService.verifyRegisteredUser(newUser, 'an account with this email already exists')

    const user = await User.create({
      email,
      password,
      username: email,
    });

    return this.login(...arguments);
  }

  async update({ auth, request, params }) {
    const currentUser = await auth.getUser()

    const validation = await validateAll(request.only('password'), {
      password: 'required|min:6',
    })

    if(validation.fails()) {
      return response.status(400).json(validation.messages());
    }

    const user = await User.find(params.id)
    AuthorizationService
      .verifyPermission(
        user,
        currentUser,
        'user does not exist or has been previously deleted',
      )

    user.merge(request.only('password'))
    await user.save()
    return user
  }

  async destroy({ auth, request, params, reponse }) {
    const currentUser = await auth.getUser();
    const user = await User.find(params.id);

    AuthorizationService
      .verifyPermission(
        user,
        currentUser,
        'user does not exist or has been previously deleted',
      )

    await user.delete();

    return {
      user,
      message: 'user deleted successfully'
    };
  }

  async show({ auth, request, response, params}) {
    const currentUser = await auth.getUser();
    const user = await User.find(params.id);

    AuthorizationService
      .verifyPermission(
        user,
        currentUser,
        'user does not exist or has been previously deleted',
      )

    return { user }
  }
}

module.exports = UserController
