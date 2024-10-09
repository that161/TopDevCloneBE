const { channelPool } = require('./pool');

// function subscribeToMessages used pool connection and pool channel
async function subscribeToMessages(topic, ...callbacks) {
  const channel = await channelPool.acquire();
  const exchangeName = 'job_services'; // exchange's name
  const queueName = `job_services_queue_${topic}`;

  await channel.assertExchange(exchangeName, 'topic', { durable: false });
  await channel.assertQueue(queueName, { exclusive: true });
  channel.bindQueue(queueName, exchangeName, topic);

  console.log(`Waiting for messages on topic '${topic}'...`);

  channel.consume(
    queueName,
    (message) => {
      if (message) {
        const messageData = JSON.parse(message.content.toString());
        console.log(`Received message for topic '${topic}'`);

        // Loop through each callback in the rest parameter array and execute it with the message data
        callbacks.forEach((callback) => {
          callback(messageData);
        });
      }
    },
    { noAck: true },
  );

  channelPool.release(channel); // Return channel to pool
}

module.exports = { subscribeToMessages };
