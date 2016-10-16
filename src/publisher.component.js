(function() {
  'use strict';

  angular
    .module("engageableApp")
    .component("publisher", publisher());

  function publisher() {
    var component = {
      templateUrl: "./publisher.component.html",
      controller: PublisherComponentController,
    };

    return component;
  }


  /****************************************************************
                       Controller
  ****************************************************************/

  PublisherComponentController.$inject = [
    "eventDispatcherService",
  ];

  function PublisherComponentController(eventDispatcherService) {
    var vm = this;

    /****************************************************************
                         Bindable Members
    ****************************************************************/

    // Methods
    vm.$onInit = $onInit;

    // HQTT
    vm.topic = "sensorData/#";


    /****************************************************************
                        Controller Methods
    ****************************************************************/

    function $onInit() {
      eventDispatcherService.subscribe(vm.topic, function(responseObject) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      },
      function(message) {
        console.log("onMessageArrived:" + message.payloadString);
      });
    }
  }

}());
