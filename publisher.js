// publisher.js
const createConnection = require('./rabbitmqcon');

async function publish(queue, message) {
    const { connection, channel } = await createConnection(process.env.CLOUDMQ_URL);
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(message));
    // console.log(`Message sent to queue ${queue}: ${message}`);
    console.log(`Message sent to queue ${queue}`);

    await channel.close();
    await connection.close();
}

module.exports = { publish };

// Example usage
// publish('test_queue', 'Hello, RabbitMQ!');
