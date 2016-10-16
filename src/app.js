(function() {
  'use strict';

    var client = mqtt.connect("ws://52.25.184.170:8080");
    client.on("connect", function() {
      client.subscribe("sensorData");
    });

    client.on("message", function(topic, message) {
      console.log(message.toString());
      client.end();
    });
}());
