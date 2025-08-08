const amqp = require("amqplib")

const RABBIT_URL = process.env.RABBIT_URL;

let connection, channel;

async function connect() {
    connection = await amqp.connect(RABBIT_URL);
    channel = await connection.createChannel();
    console.log("Connected to rabbitMQ");
    
}

async function subscribeToQueue(queueName, callBack) {
    if(!channel) await connect();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) =>{
        callBack(message.content.toString())
        channel.ack(message)
    })
}

async function publishToQueue(queueName, data) {
    if(!channel) await connect();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data))
}

module.exports ={
    subscribeToQueue,
    publishToQueue,
    connect
}