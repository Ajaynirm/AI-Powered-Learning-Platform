import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "ai-worker",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
await producer.connect();

export const publishSkillsUpdated = async (payload) => {
  await producer.send({
    topic: "user.skills.updated",
    messages: [{ value: JSON.stringify(payload) }],
  });
};

export const publishOpenaiFailed = async (payload) => {
  await producer.send({
    topic: "openai.failed",
    messages: [{ value: JSON.stringify(payload) }],
  });
};
