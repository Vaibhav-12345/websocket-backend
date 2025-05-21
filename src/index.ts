// import express from 'express'
// import cors from 'cors'
// import userRouter from './routes/user';
// const app=express();

// app.use(cors({
//     origin:['http//:localhost:3000'],
//     credentials:true
// }))
// app.use(express.json())

// app.use('/api/v1/user',userRouter)


// app.listen(3000);


// import WebSocket ,{ WebSocketServer } from "ws";

// const wss = new WebSocketServer({port:3000})

// wss.on('connection',(ws)=>{
//     console.log('websocket is ready')
//     // backend se message bhej raha hu 
//     // ws.send('hello how are you')
//     // ws.send(JSON.stringify({ type: 'message', content: 'Hello from server' }));
    
//     // yaha hame client se data aayega mere server pe 
//     ws.on('message',(data)=>{
//         console.log(data.toString())
//         ws.send(data.toString())
//     })
    
// })


// import WebSocket, { WebSocketServer } from "ws";

// type Client = {
//   socket: WebSocket;
// };

// const clients: Client[] = [];

// const wss = new WebSocketServer({ port: 3000 });

// wss.on('connection', (ws) => {
//   console.log('✅ New client connected');
//   clients.push({ socket: ws });

//   ws.on('message', (data) => {
//     console.log('📩 Received:', data.toString());

//     // Broadcast to all other clients
//     clients.forEach(client => {
//       if (client.socket !== ws && client.socket.readyState === WebSocket.OPEN) {
//         client.socket.send(data.toString());
//       }
//     });
//   });

//   ws.on('close', () => {
//     const index = clients.findIndex(c => c.socket === ws);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     console.log('❌ Client disconnected');
//   });
// });


// import WebSocket, { WebSocketServer } from "ws";

// type Client = {
//   socket: WebSocket;
// };

// const clients: Client[] = [];

// const wss = new WebSocketServer({ port: 3000 });


// wss.on("connection", (ws) => {
//   console.log("✅ New client connected");
//   clients.push({ socket: ws });

//   ws.on("message", (data) => {
//     console.log("📩 Received:", data.toString());

//     // ✅ Broadcast to all (including sender)
//     clients.forEach((client) => {
//       if (client.socket.readyState === WebSocket.OPEN) {
//         client.socket.send(data.toString());
//       }
//     });
//   });

//   ws.on("close", () => {
//     const index = clients.findIndex((c) => c.socket === ws);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     console.log("❌ Client disconnected");
//   });
// });

import exress  from 'express'
import cors from 'cors'
const app=exress()
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}))

app.get("/", (req, res)=>{
  res.send("WebSocket server is running ✅")
});

const server=app.listen(3000);

import WebSocket, { WebSocketServer } from "ws";

type Client = {
  socket: WebSocket;
};

const clients: Client[] = [];

const wss = new WebSocketServer({server });

wss.on("connection", (ws) => {
  console.log("✅ New client connected");
  clients.push({ socket: ws });

  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data.toString());

      // Optional: Validate the message structure
      if (parsed.user && parsed.message) {
        console.log("📩 Received:", parsed);

        // Broadcast to all connected clients
        clients.forEach((client) => {
          if (client.socket.readyState === WebSocket.OPEN) {
            client.socket.send(JSON.stringify(parsed));
          }
        });
      } else {
        console.warn("⚠️ Invalid message format:", parsed);
      }
    } catch (err) {
      console.error("⚠️ Failed to parse message:", err);
    }
  });

  ws.on("close", () => {
    try {
      const index = clients.findIndex((c) => c.socket === ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      console.log("❌ Client disconnected");
    } catch (err) {
      console.error("⚠️ Error handling disconnect:", err);
    }
  });

  // Handle unexpected errors to avoid server crash
  ws.on("error", (err) => {
    console.error("❗ WebSocket error:", err.message);
  });
});

console.log("🚀 WebSocket server started on ws://localhost:3000");