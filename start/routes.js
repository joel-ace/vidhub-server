'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

Route.group(() => {
  Route.resource('users', 'UserController')
  .apiOnly()
  .middleware(new Map([
    [['users.index', 'users.update', 'users.destroy', 'users.show'], ['auth']]
  ]))

  Route.resource('category', 'VideoCategoryController')
  .only(['index', 'update', 'destroy', 'store'])
  .middleware(['authAdminOnly'])

  Route.post('auth/login', 'UserController.login')
}).prefix('api')




