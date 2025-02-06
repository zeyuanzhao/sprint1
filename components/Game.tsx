"use client";

import { Button, Input } from "@heroui/react";
import { IQuestion } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import { onAsk } from "@/app/actions";

export default function Game() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [question, setQuestion] = useState<string>("");

  return (
    <div className="flex flex-col space-between">
      <div>
        {questions?.map((q, i) => (
          <div key={i}>
            <p>{q.question}</p>
            <p>{q.answer}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row px-4 gap-2">
        <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
        <Button
          onPress={() => {
            onAsk(question).then((res) => {
              if (!res) return;
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
