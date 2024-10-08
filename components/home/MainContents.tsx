import { thirdStepAtom } from "@/lib/atom";
import axios from "axios";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface IProps {
  teamId: string | null;
}

interface IRandomQuiz {
  question: string;
  member: string;
}

const MainContents = ({ teamId }: IProps) => {
  const isFinal = useAtom(thirdStepAtom);
  const [randomQuiz, setRandomQuiz] = useState<IRandomQuiz[]>([]);
  const [error, setError] = useState("");

  const getRandomQuiz = useCallback(async () => {
    if (!teamId) return;

    try {
      const response = await axios.get(`/api/random?teamId=${teamId}`);

      if (response.status === 200) {
        setRandomQuiz(response.data.assignedAnswer);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("랜덤 문제 getRandomQuiz POST 요청에서 오류 발생", error);
        setError("오류가 발생하여 문제를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        toast.error(error.response?.data.message);
      }
    }
  }, [teamId]);

  useEffect(() => {
    getRandomQuiz();
  }, [getRandomQuiz]);

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
          {error !== "" && <span className="error-text-start">{error}</span>}
        </div>
      ))}
    </motion.div>
  );
};

export default MainContents;
