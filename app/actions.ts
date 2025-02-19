"use server";

import { model, generationConfig } from "@/library/AskQuestion";
import askQuestion from "@/library/AskQuestion";

const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const getWord = async () => {
  const result = await chatSession.sendMessage("What is the word?");
  return result?.response.text().trim();
};

export const onAsk = async (question: string | undefined) => {
  if (!question || !chatSession) return;
  return askQuestion(question, chatSession);
};
