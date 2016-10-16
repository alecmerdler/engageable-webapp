(function() {
  'use strict';

  angular
    .module("engageableApp", [
      "ngMaterial",
    ])
    .config(config);

    config.$inject = [
      "$httpProvider",
    ];

    function config($httpProvider) {
      // CSRF configuration
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }

}());
