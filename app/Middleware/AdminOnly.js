'use strict'

const AuthorizationService = use('App/Services/AuthorizationService')

class AdminOnly {
  async handle ({ request, auth }, next) {
    const user = await auth.getUser()

    AuthorizationService.veryfiyAccess(user, 'admin', 'you are not authorized to access this resource')
    // call next to advance the request
    await next()
  }
}

module.exports = AdminOnly
