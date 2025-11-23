import { Kafka } from "kafkajs";
import { updateUserSkills } from "../services/skills.service.js";
import { publishSkillsUpdated, publishOpenaiFailed } from "./producer.js";
import { callOpenAI } from "../services/openai.js";

const kafka = new Kafka({
  clientId: "ai-worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "ai-workers" });

export const initConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test.completed" });

  console.log("AI Worker Consumer connected 🧠");

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("Received:", data);

      try {
        // 1. Send to OpenAI
        const result = await callOpenAI(data.answers);

        // result = { strength:[], weakness:[], tackled:[] }

        // 2. Update DB
        const updatedSkills = await updateUserSkills(data.userId, result);

        // 3. Publish updated skills
        await publishSkillsUpdated({
          userId: data.userId,
          ...updatedSkills
        });

        console.log("Skills updated:", updatedSkills);

      } catch (err) {
        console.error("OpenAI error:", err);
        await publishOpenaiFailed({
          userId: data.userId,
          testId: data.testId,
          reason: err.message,
          retry: true
        });
      }
    }
  });
};
