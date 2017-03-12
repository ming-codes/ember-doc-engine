import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
  this.route('modules', { path: '/modules/:moduleName' });
  this.route('classes', { path: '/classes/:className' });
});
