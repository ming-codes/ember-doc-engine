import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
  this.route('projects', { path: '/projects/:projectName' }, function() {
    this.route('modules', { path: '/modules/:moduleName' }, function() {
      this.route('classes', { path: '/classes/:className' }, function() {
        this.route('methods');
        this.route('properties');
        this.route('attributes');
        this.route('events');
      });
    });
  });
});
