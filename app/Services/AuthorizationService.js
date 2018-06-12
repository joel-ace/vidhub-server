const InvalidAccessException = use('App/Exceptions/InvalidAccessException')
const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException')
const UserExistException = use('App/Exceptions/UserExistException')
const UserNotAdminException = use('App/Exceptions/UserNotAdminException')
const ValidationErrorException = use('App/Exceptions/ValidationErrorException')

class AuthorizationService {
  verifyPermission(resource, user, message) {
    if (!resource)  {
      throw new ResourceNotExistException(message)
    }

    if (user.id !== resource.id && user.account_type !== 'admin') {
      throw new InvalidAccessException('You are not authorized to access this resource')
    }
  }

  handleResourceNotExists(resource, message) {
    if (!resource)  {
      throw new ResourceNotExistException(message)
    }
  }

  verifyRegisteredUser(user, message) {
    if (user)  {
      throw new UserExistException(message)
    }
  }

  veryfiyAccess({ account_type }, type) {
    if (account_type !== type)  {
      throw new UserNotAdminException()
    }
  }

  returnValidationErrors(validation, response) {
    if(validation.fails()) {
      throw new ValidationErrorException(validation.messages())
    }
  }
}

module.exports = new AuthorizationService()
