(function() {
  'use strict';

  angular
    .module("engageableApp")
    .component("publisher", publisher());

  function publisher() {
    var component = {
      templateUrl: "/src/publisher.component.html",
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
    vm.publishMessage = publishMessage;

    // HQTT
    vm.topic = "sensorData";

    // Events
    vm.events = [];

    // Other
    vm.loading = true;


    /****************************************************************
                        Controller Methods
    ****************************************************************/

    function $onInit() {
      vm.events = eventDispatcherService.getEvents();
    }


    function publishMessage(event) {
      eventDispatcherService.publishMessage(vm.topic, event);
    }
  }

}());
