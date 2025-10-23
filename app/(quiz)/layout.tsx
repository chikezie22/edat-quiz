import { QuizProvider } from "@/providers/quiz-provider";
import { ReactNode } from "react";

export default async function QuizLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ roundId: string }>;
}) {
  const { roundId } = await params;
  return (
    <QuizProvider initialRoundId={roundId} totalQuestions={100}>
      <div className="min-h-screen bg-gray-50 lg:px-[122px] lg:py-[111px] p-5">
        {children}
      </div>
    </QuizProvider>
  );
}
