"use client";
import { useRouter } from "next/navigation";
export default function ButtonToQuiz() {
  const router = useRouter();
  return (
    <button
      className="text-edat-primary border border-white p-4 rounded-md cursor-pointer"
      onClick={() => {
        router.push(`/quiz/round-1/question/1`);
      }}
    >
      go to quiz
    </button>
  );
}
