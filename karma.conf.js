// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/Angular-Hero/angular-hero.js',
      'client/bower_components/angular-translate/angular-translate.js',
      'client/bower_components/ng-file-upload/ng-file-upload.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'client/bower_components/markerclustererplus/src/markerclusterer.js',
      'client/bower_components/google-maps-utility-library-v3-markerwithlabel/dist/markerwithlabel.js',
      'client/bower_components/google-maps-utility-library-v3-infobox/dist/infobox.js',
      'client/bower_components/google-maps-utility-library-v3-keydragzoom/dist/keydragzoom.js',
      'client/bower_components/js-rich-marker/src/richmarker.js',
      'client/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'client/bower_components/angular-material-data-table/dist/md-data-table.js',
      'client/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'client/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'client/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'client/bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'client/bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': 'babel'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        optional: [
          'es7.classProperties'
        ]
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    plugins: [
        require('karma-phantomjs-launcher'),
        require('karma-ng-html2js-preprocessor'),
        require('karma-babel-preprocessor'),
        require('karma-spec-reporter'),
        require('karma-mocha'),
        require('karma-chai-plugins'),
        require('karma-requirejs'),
        require('karma-ng-scenario')
    ]
  });
};
