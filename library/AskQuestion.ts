import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import dotenv from "dotenv";
import promptSync from "prompt-sync";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Please set the GEMINI_API_KEY environment variable.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const sysprompt = fs.readFileSync("prompt.txt", "utf8");

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: sysprompt,
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const askQuestion = async (question: string, chatSession: ChatSession) => {
  const res = chatSession.sendMessage(question);
  return (await res).response.text().trim();
};

export default askQuestion;
