"use server";

import { IQuestion } from "@/interfaces";
// import { model, generationConfig } from "@/library/AskQuestion";
// import askQuestion from "@/library/AskQuestion";

// const chatSession = model.startChat({
//   generationConfig,
//   history: [],
// });

// export const getWord = async () => {
//   const result = await chatSession.sendMessage("What is the word?");
//   return result?.response.text().trim();
// };

// export const onAsk = async (question: string | undefined) => {
//   if (!question || !chatSession) return;
//   return askQuestion(question, chatSession);
// };
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Please set the GEMINI_API_KEY environment variable.");
}
const sysprompt = fs.readFileSync("prompt.txt", "utf8");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: sysprompt,
});

export async function getWord() {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "This is a request from the game. Do not respond with an emoji. Answer with the actual word. What is the word?",
            },
          ],
        },
      ],
    });

    const responseText = result.response.text().trim();
    return responseText;
  } catch (error) {
    console.error("Error: ", error);
    return "ERROR CHECK LOGS";
  }
}

export async function askQuestion(
  history: IQuestion[],
  prompt: string,
  word: string
) {
  try {
    // format messages
    const messages: Content[] = [];
    messages.push({
      role: "user",
      parts: [
        {
          text: "This is a request from the game. Do not respond with an emoji. Answer with the actual word. What is the word?",
        },
      ],
    });
    messages.push({ role: "model", parts: [{ text: word }] });
    history.forEach((q) => {
      messages.push({ role: "user", parts: [{ text: q.question }] });
      messages.push({ role: "model", parts: [{ text: q.answer }] });
    });
    messages.push({ role: "user", parts: [{ text: prompt }] });

    const result = await model.generateContent({
      contents: messages,
    });

    const responseText = result.response.text().trim();
    return responseText;
  } catch (error) {
    console.error("Error: ", error);
    return "ERROR CHECK LOGS";
  }
}
