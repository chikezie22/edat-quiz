/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/providers/quiz-provider";
import { useEffect } from "react";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  questionNumber: number;
}

interface QuizResultClientProps {
  question: Question;
  roundId: string;
  selectedAnswer: string;
}

export default function QuizResultClient({
  question,
  roundId,
  selectedAnswer,
}: QuizResultClientProps) {
  const router = useRouter();
  const { getAnswer, quizState, getProgress } = useQuiz();

  const answer = getAnswer(question.id);
  const progress = getProgress();
  console.log(question);
  // Debug: Log to verify state
  useEffect(() => {
    console.log("Result page loaded");
    console.log("Answer from context:", answer);
    console.log("Selected:", selectedAnswer);
    console.log("Correct:", question.correctAnswer);
  }, [answer, selectedAnswer, question.correctAnswer]);

  const handleNext = () => {
    const nextId = parseInt(question.id) + 1;

    if (nextId <= quizState.totalQuestions) {
      router.push(`/quiz/${roundId}/question/${nextId}`);
    } else {
      router.push(`/summary/${roundId}`);
    }
  };

  return (
    <div>
      <div className="w-full mx-auto space-y-9">
        <header className="text-center space-y-[19px]">
          <div className="space-y-3">
            <h1 className="text-[44px] font-changa-one text-edat-primary">
              Edat Quiz
            </h1>
            <p className="text-edat-dark/50 font-segoe font-semibold">
              Quiz Challenge Competition
            </p>
          </div>
          <h2 className="text-xl text-edat-dark font-segoe font-semibold">
            Edat Quiz Challenge 2026 - Round {roundId?.split("-")[1]}: Global
            Innovator
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Question & Answer */}
          <div className="bg-edat-primary rounded-3xl p-8 text-white">
            <div className=" text-white lg:text-2xl  mb-10 font-semibold font-segoe">
              Machine Analysis: Incorrect Answer
            </div>

            <div className="bg-white text-edat-primary px-4 py-2 rounded-full inline-block mb-6 font-sf-pro">
              Question {question?.questionNumber}
            </div>

            <h2 className="text-xl mb-8 font-sf-pro">{question.text}</h2>

            <div className="space-y-5">
              {question.options.map((option) => {
                const isSelected = option.id === selectedAnswer;
                const isCorrectAnswer = option.id === question.correctAnswer;

                return (
                  <div
                    key={option.id}
                    className={`
                       rounded-xl flex gap-2 font-sf-pro items-center

                    `}
                  >
                    <button
                      className={`rounded-xl h-full py-[20px] px-3.5   md:text-3xl ${
                        isCorrectAnswer
                          ? "bg-[#03B799] text-white"
                          : "bg-white text-edat-primary"
                      }`}
                    >
                      {option.label}
                    </button>
                    <button
                      className={`rounded-xl px-5 py-[20px] md:text-2xl flex-1 flex justify-between ${
                        isCorrectAnswer
                          ? "bg-[#03B799] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {option.text}
                      {isCorrectAnswer && (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}

                      {!isSelected && option.id === "d" && (
                        <svg
                          className="w-8 h-8 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Feedback */}
          <div className="bg-white rounded-3xl lg:py-[58px] p-3 lg:px-[60px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-[#ddd] place-self-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold font-sf-pro mb-4 text-edat-dark">
                Machine's Reasoning
              </h3>
              <p className="text-edat-dark mb-[56px] font-segoe text-xl">
                "{question.text}"
              </p>
            </div>

            <div className=" space-y-4">
              <p className="font-bold text-[#FF0000] text-lg mb-2 font-sf-pro md:text-2xl">
                Error:
              </p>
              <p className="text-edat-dark/60 font-segoe font-semibold  md:text-xl">
                Failed to account for idealized{" "}
                <span className="font-bold text-[#FF0000]">
                  "frictionless surface"
                </span>{" "}
                condition" condition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
