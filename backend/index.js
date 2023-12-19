const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const { spawn } = require('child_process');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {origin: "http://localhost:3000", methods: ["GET", "POST"]},
});

server.listen(4000, () => { console.log("listening on *:4000"); });

let ladleNumber = null;
let timeAtLC = null;
let timeAtConverter = null;
let activeLadles = 0;

// Call Python function
function callPythonFunction() {
  const pythonProcess = spawn('python', ['check.py']);

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python function: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log(`Python function returned: ${outputData}`);
    } else {
      console.error(`Python process exited with code ${code}`);
    }
  });
}

// Call the Python function when needed
callPythonFunction();
