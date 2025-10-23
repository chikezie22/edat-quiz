/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/providers/quiz-provider";
import { useState } from "react";

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

interface QuizQuestionClientProps {
  question: Question;
  roundId: string;
}

export default function QuizQuestionClient({
  question,
  roundId,
}: QuizQuestionClientProps) {
  const router = useRouter();
  const { submitAnswer, isQuestionAnswered, quizState } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const alreadyAnswered = isQuestionAnswered(question.id);

  const handleOptionClick = async (optionId: string) => {
    // Prevent multiple submissions
    if (isSubmitting || alreadyAnswered) {
      console.log("Already submitting or answered");
      return;
    }

    console.log("Option clicked:", optionId);
    setSelectedOption(optionId);
    setIsSubmitting(true);

    // Check if correct
    const isCorrect = optionId === question.correctAnswer;
    console.log("Is correct:", isCorrect);

    // IMMEDIATELY save to context FIRST
    submitAnswer(question.id, optionId, isCorrect);

    // Small visual feedback delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (isCorrect) {
      console.log("Correct! Going to next question");
      // Correct - go to next question
      const nextId = parseInt(question.id) + 1;

      if (nextId <= quizState.totalQuestions) {
        router.push(`/quiz/${roundId}/question/${nextId}`);
      } else {
        // Quiz complete
        router.push(`/summary/${roundId}`);
      }
    } else {
      console.log("Wrong! Going to result page");
      // Wrong - IMMEDIATELY show feedback
      router.push(
        `/quiz/${roundId}/question/${question.id}/result?selected=${optionId}`
      );
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

        <div className="bg-edat-primary rounded-3xl lg:pt-[81px] lg:px-[87px] lg:pb-10 p-3 text-white shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="bg-white text-edat-primary font-bold p-2.5 lg:px-7 lg:py-5 rounded-full max-w-[158px] font-sf-pro lg:text-xl">
              Question {question.questionNumber}
            </div>

            <div className="bg-white text-edat-primary lg:px-6 lg:py-3 p-2.5 lg:text-lg font-segoe rounded-full font-semibold flex items-center gap-2">
              <div className="flex items-center justify-center">
                <div className="lg:w-10 lg:h-10 w-5 h-5 border-4  border-[#6b6b6b] border-t-[#15B779] rounded-full animate-spin"></div>
              </div>
              49 Sec
            </div>
          </div>

          <h2 className="text-2xl md:text-[40px] mb-8 font-sf-pro">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isDisabled = isSubmitting || alreadyAnswered;

              return (
                <div
                  className="flex gap-2 items-center font-sf-pro"
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <button
                    className={`rounded-xl h-full px-3.5   md:text-3xl ${
                      isSelected
                        ? "bg-[#03B799] text-white"
                        : "bg-white text-edat-primary"
                    }`}
                    disabled={isDisabled}
                  >
                    {option.label}
                  </button>
                  <button
                    className={`rounded-xl px-5 py-[30px] md:text-2xl flex-1 flex justify-between ${
                      isSelected
                        ? "bg-[#03B799] text-white"
                        : "bg-white text-black"
                    }`}
                    disabled={isDisabled}
                  >
                    {option.text}
                    {isSelected && (
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
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" flex gap-4 items-center px-6 py-2 rounded-3xl bg-[#F5F5F5]">
          <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold text-nowrap">
            📱 Digital Oracle
          </span>
          <span className="bg-purple-400 text-purple-900 px-4 py-2 rounded-full text-sm font-semibold text-nowrap">
            🧪 Bayman's Analysis
          </span>
        </div>
        <div className="text-center mt-6 flex items-center justify-center gap-2 text-gray-600">
          <svg
            className="w-5 h-5 animate-spin text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="font-medium">Upcoming Multimedia Question</span>
        </div>
      </div>
    </div>
  );
}
