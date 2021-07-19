var _ = require('underscore'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	app.get('/api/post/list', keystone.initAPI, routes.api.posts.list);
	app.all('/api/post/create', keystone.initAPI, routes.api.posts.create);
	app.get('/api/post/:id', keystone.initAPI, routes.api.posts.get);
	app.all('/api/post/:id/update', keystone.initAPI, routes.api.posts.update);
	app.get('/api/post/:id/remove', keystone.initAPI, routes.api.posts.remove);

}
