import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
  this.route('projects', { path: '/projects/:projectName' }, function() {
    this.route('modules', { path: '/modules/:moduleName' }, function() {
      this.route('classes', { path: '/classes/:className' }, function() {
        this.route('methods', function() {
          this.route('anchor', { path: '/:anchorName' });
        });
        this.route('properties', function() {
          this.route('anchor', { path: '/:anchorName' });
        });
        this.route('attributes', function() {
          this.route('anchor', { path: '/:anchorName' });
        });
        this.route('events', function() {
          this.route('anchor', { path: '/:anchorName' });
        });
      });
    });
  });
});
