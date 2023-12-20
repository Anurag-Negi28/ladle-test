const express = require('express');
const FormData = require('form-data');
const fs = require('fs');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const axios = require('axios');
const cors = require('cors');
const { spawn } = require('child_process');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
 cors: {origin: "http://localhost:5173", methods: ["GET", "POST"]},
});

server.listen(4000, () => { console.log("listening on *:4000"); });

// let ladleNumber = null;
// let timeAtLC = null;
// let timeAtConverter = null;
// let activeLadles = 0;

// io.on('connection', (socket) => {
//  console.log('client connected: ', socket.id);

//  socket.on('disconnect', (reason) => {
//  console.log('client disconnected: ', reason);
//  });
// });

io.on('connection', (socket) => {
    console.log('client connected: ', socket.id);

    socket.on('disconnect', (reason) => {
        console.log('client disconnected: ', reason);
    });

    // Add a route to trigger ML model execution
    
});

app.get('/predict', async (req, res) => {
    try {
        const pythonProcess = spawn('python', ['check.py']);
        let errorData = '';
        let result = '';
 
        pythonProcess.stdout.on('data', (data) => {
            result = data.toString().trim();
            if (result === 'Error') {
                // Accumulate error messages
                errorData += result;
            }
        });
 
        pythonProcess.stderr.on('data', (data) => {
            // Accumulate error messages
            errorData += data.toString();
        });
 
        pythonProcess.on('close', (code) => {
            if (code !== 0 || errorData) {
                // If there was an error or non-zero exit code
                console.error('Error:', errorData);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(`Predicted Digit: ${result}`);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
 });
 

