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


    function publishMessage(topic, string) {
      var message = new Paho.MQTT.Message(string);
      message.destinationName = topic;
      client.send(message);
    }


  }



}());
