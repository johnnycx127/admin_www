'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/datatables/media/jquery.dataTables.min.css',
        'public/lib/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
        'public/lib/simple-line-icons/css/simple-line-icons.css',
        'public/lib/angular-snap/angular-snap.min.css',
        'public/global/plugins/Snap.js-2.0.0-rc1/dist/2.0.0-rc1/snap.css',
        'public/global/plugins/font-awesome/css/font-awesome.min.css',
        'public/global/css/components.min.css',
        'public/global/css/plugins.min.css',
        'public/global/plugins/uniform/css/uniform.default.css',
        'public/layouts/layout/css/layout.min.css',
        'public/layouts/layout/css/themes/light.min.css',
        'public/layouts/layout/css/custom.min.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/oclazyload/dist/ocLazyLoad.min.js',
        'public/lib/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
        'public/lib/jquery-slimscroll/jquery.slimscroll.min.js',
        'public/lib/bootstrap-switch/dist/js/bootstrap-switch.min.js',
        'public/lib/angular-morris-chart/src/angular-morris-chart.min.js',
        'public/lib/angular-datatables/dist/angular-datatables.min.js',
        'public/lib/datatables/media/js/jquery.dataTables.min.js',
        'public/lib/angular-breadcrumb/dist/angular-breadcrumb.min.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
        'public/lib/angular-snap/angular-snap.min.js',
        'public/global/plugins/Snap.js-2.0.0-rc1/dist/2.0.0-rc1/snap.js',
        'public/global/scripts/app.min.js',
        'public/global/plugins/jquery.blockui.min.js',
        'public/global/plugins/jquery.cokie.min.js',
        'public/global/plugins/uniform/jquery.uniform.min.js',
        'public/layouts/layout/scripts/layout.min.js',
        'public/layouts/global/scripts/quick-sidebar.min.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
