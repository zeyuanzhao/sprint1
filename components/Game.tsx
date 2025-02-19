"use client";

import { Button, Input } from "@heroui/react";
import { IQuestion } from "@/interfaces";
import { FormEvent, useEffect, useRef, useState } from "react";
import { askQuestion, getWord } from "@/app/actions";

export default function Game() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const word = await getWord();
      console.log("The word is: ", word);
      setWord(word);
    };

    fetchData();
  }, []);

  const onAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!question.trim()) return;
    const response = await askQuestion(questions, question, word);
    setQuestions([...questions, { question, answer: response }]);

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto px-4 py-2 min-h-0 h-0">
        {questions?.map((q, i) => (
          <div
            key={i}
            className="flex flex-row justify-between border-b-1 py-4"
          >
            <p className="text-xl">{q.question}</p>
            <div className="">
              <p className="text-2xl">{q.answer}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="flex flex-row px-4 gap-2 py-4" onSubmit={onAskQuestion}>
        <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
        <Button
          type="submit"
          disabled={loading}
          color={loading ? "default" : "primary"}
        >
          <p className="text-lg">Ask</p>
        </Button>
      </form>
    </div>
  );
}
