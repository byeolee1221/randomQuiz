import { thirdStepAtom } from "@/lib/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ResetAndRetry from "./ResetAndRetry";
import { getRandomQuiz } from "@/lib/utils";
import { IRandomQuiz } from "@/types/typeShare";

interface IProps {
  teamId: string | null;
}

const MainContents = ({ teamId }: IProps) => {
  const isFinal = useAtom(thirdStepAtom);
  const [randomQuiz, setRandomQuiz] = useState<IRandomQuiz[]>([]);

  useEffect(() => {
    getRandomQuiz({ teamId, setRandomQuiz });
  }, [teamId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isFinal ? 1 : 0, y: isFinal ? 0 : -20 }}
      transition={{ duration: 1 }}
      className="flex flex-col space-y-6"
    >
      {randomQuiz.map((quiz) => (
        <div key={quiz.question} className="bg-slate-600 p-2 rounded-lg flex flex-col space-y-2">
          <h2 className="font-bold text-xl">🎙 질문</h2>
          <p>{quiz.question}</p>
          <span>{quiz.member}님이 답변해주세요.</span>
        </div>
      ))}
      <div className="flex flex-col space-y-5 items-center justify-center">
        <ResetAndRetry teamId={teamId} setRandomQuiz={setRandomQuiz} />
      </div>
    </motion.div>
  );
};

export default MainContents;
