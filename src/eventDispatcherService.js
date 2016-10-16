(function() {
  'use strict';

  angular
    .module("engageableApp")
    .service("eventDispatcherService", eventDispatcherService);

  eventDispatcherService.$inject = [
    "$q",
  ];

  function eventDispatcherService($q) {

    /****************************************************************
                         Private Attributes
    ****************************************************************/

    var hqttBrokerUrl = {
      hostname: "52.25.184.170",
      port: 8080,
    };


    /****************************************************************
                         Factory Object
    ****************************************************************/

    var eventDispatcherService = {
      subscribeTopic: subscribeTopic,
      publishMessage: publishMessage,
      getEvents: getEvents,
    };

    return eventDispatcherService;


    /****************************************************************
                         Methods
    ****************************************************************/

    // TODO: Return rx.Observable to subscribe to
    function subscribeTopic(topic, onConnectionLost, onMessageArrived) {
      var client = new Paho.MQTT.Client(hqttBrokerUrl.hostname, Number(hqttBrokerUrl.port), "clientId");
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      client.connect({onSuccess: function() {
        client.subscribe(topic);
      }});
    }


    function publishMessage(topic, payload) {
      var client = new Paho.MQTT.Client(hqttBrokerUrl.hostname, Number(hqttBrokerUrl.port), "clientId");
      var message = new Paho.MQTT.Message(angular.toJson(payload));
      message.destinationName = topic;

      client.connect({onSuccess: function() {
        client.send(message);
      }});

    }


    function getEvents() {
      var events = [
        {
          'id': 0,
          'eventType': 0
        },
        {
          'id': 1,
          'eventType': 1
        },
        {
          'id': 2,
          'eventType': 2
        },
        {
          'id': 3,
          'eventType': 3
        },
        {
          'id': 4,
          'eventType': 4
        }
      ];

      return events;
    }


  }



}());
