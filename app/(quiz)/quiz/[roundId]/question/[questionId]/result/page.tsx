import QuizResultClient from "@/app/components/quiz-result";

interface ResultPageProps {
  params: Promise<{
    roundId: string;
    questionId: string;
  }>;
  searchParams: Promise<{ selected?: string }>;
}

async function getQuestion(questionId: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: questionId,
    questionNumber: parseInt(questionId),
    text: '"A perfectly frictionless surface and push a box on it with a constant force for one second, what happens to the box\'s velocity after you stop pushing?"',
    options: [
      { id: "a", label: "A", text: "A perfectly frictionless surface." },
      { id: "b", label: "B", text: "A perfectly frictionless surface." },
      { id: "c", label: "C", text: "A perfectly frictionless surface." },
      { id: "d", label: "D", text: "A perfectly frictionless surface." },
    ],
    correctAnswer: "b",
  };
}

export default async function ResultPage({
  params,
  searchParams,
}: ResultPageProps) {
  const { roundId, questionId } = await params;
  const resolvedSearchParams = await searchParams;
  const selectedAnswer = resolvedSearchParams?.selected || "";

  const question = await getQuestion(questionId);

  return (
    <QuizResultClient
      question={question}
      roundId={roundId}
      selectedAnswer={selectedAnswer}
    />
  );
}
