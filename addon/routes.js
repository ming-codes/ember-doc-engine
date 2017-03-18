import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
  this.route('modules', { path: '/modules/:moduleName' });
  this.route('classes', { path: '/classes/:className' }, function() {
    this.route('methods');
    this.route('properties');
    this.route('attributes');
    this.route('events');
  });
});
