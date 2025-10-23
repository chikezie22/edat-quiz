import QuizQuestionClient from "@/app/components/quiz-question";

// Mock function - replace with your API call
async function getQuestion(questionId: string) {
  // Simulate API delay
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
    correctAnswer: "b", // Changed to B so A is wrong for testing
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ roundId: string; questionId: string }>;
}) {
  const { roundId, questionId } = await params;
  const question = await getQuestion(questionId);

  return <QuizQuestionClient question={question} roundId={roundId} />;
}
