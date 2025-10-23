"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface Answer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  timeStamp: number;
}

interface QuizState {
  roundId: string;
  currentQuestionId: string;
  answers: Answer[];
  score: number;
  timeRemaining: number;
  totalQuestions: number;
}

interface QuizContextType {
  quizState: QuizState;
  submitAnswer: (
    questionId: string,
    selectedOption: string,
    isCorrect: boolean
  ) => void;
  getAnswer: (questionId: string) => Answer | undefined;
  goToNextQuestion: () => void;
  resetQuiz?: () => void;
  isQuestionAnswered: (questionId: string) => boolean;
  getProgress: () => { answered: number; total: number; percentage: number };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);
export function QuizProvider({
  children,
  initialRoundId,
  totalQuestions = 100,
}: {
  children: ReactNode;
  initialRoundId: string;
  totalQuestions: number;
}) {
  const [quizState, setQuizState] = useState<QuizState>({
    roundId: initialRoundId,
    currentQuestionId: "1",
    answers: [],
    score: 0,
    timeRemaining: 3600,
    totalQuestions,
  });
  const submitAnswer = useCallback(
    (questionId: string, selectedOption: string, isCorrect: boolean) => {
      setQuizState((prev: QuizState) => {
        const existingAnswerIndex = prev.answers.findIndex(
          (a: Answer) => a.questionId === questionId
        );
        const newAnswer: Answer = {
          questionId,
          selectedOption,
          isCorrect,
          timeStamp: Date.now(),
        };

        let newAnswers;
        if (existingAnswerIndex >= 0) {
          newAnswers = [...prev.answers];
          newAnswers[existingAnswerIndex] = newAnswer;
        } else {
          newAnswers = [...prev.answers, newAnswer];
        }
        return {
          ...prev,
          answers: newAnswers,
          score: isCorrect ? prev.score + 10 : prev.score,
        };
      });
    },
    []
  );

  const getAnswer = useCallback(
    (questionId: string) => {
      return quizState.answers.find((a: Answer) => a.questionId === questionId);
    },
    [quizState.answers]
  );

  const isQuestionAnswered = useCallback(
    (questionId: string) => {
      return quizState.answers.some((a) => a.questionId === questionId);
    },
    [quizState.answers]
  );

  const goToNextQuestion = useCallback(() => {
    setQuizState((prev: QuizState) => ({
      ...prev,
      currentQuestionId: String(parseInt(prev.currentQuestionId) + 1),
    }));
  }, []);
  const getProgress = useCallback(() => {
    const answered = quizState.answers.length;
    const total = quizState.totalQuestions;
    return {
      answered,
      total,
      percentage: (answered / total) * 100,
    };
  }, [quizState.answers.length, quizState.totalQuestions]);
  const value: QuizContextType = {
    quizState,
    submitAnswer,
    getAnswer,
    goToNextQuestion,
    isQuestionAnswered,
    getProgress,
  };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within Quizprovider");
  }
  return context;
}
