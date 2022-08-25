
const express = require("express")
const WebSocket = require("ws")
const http = require('http')

const port = 8082
const server = http.createServer(express)
const wss = new WebSocket.Server({server})

wss.on('connection', ws =>{
    ws.on('message', data=>{
        wss.clients.forEach(client =>{
                client.send(data.toString().toUpperCase())
        })
    })
})

server.listen(port, () =>{
    console.log(`Server is listening on ${port}!`)
})