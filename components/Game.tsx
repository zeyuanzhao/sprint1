"use client";

import { Button, Input } from "@heroui/react";
import { IQuestion } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import { onAsk } from "@/app/actions";

export default function Game() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [question, setQuestion] = useState<string>("");
  const messagesEndRef = useRef(null);

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

      <div className="flex flex-row px-4 gap-2 py-4">
        <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
        <Button
          onPress={() => {
            onAsk(question).then((res) => {
              if (!res) return;
              setQuestion("");
              setQuestions([...questions, { question: question, answer: res }]);
            });
          }}
        >
          <p className="text-lg">Ask</p>
        </Button>
      </div>
    </div>
  );
}
