// Import modul WebSocket dari library 'ws'
const WebSocket = require("ws");

// Membuat server WebSocket di port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("✅ User connected");

  // Saat menerima pesan dari client
  ws.on("message", (message) => {
    console.log("📩 Received message: " + message);

    // Kirim pesan ke semua client lain yang terhubung
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Saat client disconnect
  ws.on("close", () => {
    console.log("❌ User disconnected");
  });
});
