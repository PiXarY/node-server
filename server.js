const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

let messages = [];

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('received: ' + message);
    messages.push(message);

    const buffer = new TextEncoder().encode(message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({type: 'message', data: Array.from(buffer)}));
      }
    });
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});