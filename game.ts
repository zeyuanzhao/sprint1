import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import dotenv from "dotenv";
import promptSync from "prompt-sync";

dotenv.config();
const prompt = promptSync({
  sigint: true,
});

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

async function main() {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage("What is the word?");
  // console.log(result.response.text().trim());

  for (let i = 0; i < 20; i++) {
    const question = prompt(`Question ${i + 1}: `);
    const result = await chatSession.sendMessage(question);
    const resultText = result.response.text().trim();
    if (resultText.toLowerCase() === "correct") {
      console.log("Correct!");
      break;
    }
    console.log(resultText);
  }
  console.log("The word was: " + result.response.text().trim());
}
