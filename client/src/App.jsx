import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

function App() {
 const [isConnected, setIsConnected] = useState(false);

 useEffect(() => {
   const socket = io("http://localhost:4000");

   socket.on('connect', () => {
     console.log('Connected to server');
     setIsConnected(true);
   });

   socket.on('message', (message) => {
     console.log('Received message: ', message);
   });

   return () => {
     socket.disconnect();
   };
 }, []);

 return (
   <div>
     {isConnected && <h1>Connected to server</h1>}
     {/* rest of your component */}
   </div>
 );
}

export default App;
