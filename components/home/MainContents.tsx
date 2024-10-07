import { fourthStepAtom } from "@/lib/atom";
import axios from "axios";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

interface IProps {
  teamId: string | null;
}

interface IRandomQuiz {
  question: string;
  member: string;
}

const MainContents = ({ teamId }: IProps) => {
  const isFourthStep = useAtom(fourthStepAtom);
  const [randomQuiz, setRandomQuiz] = useState<IRandomQuiz[]>([]);
  const [error, setError] = useState("");
  
  const getRandomQuiz = useCallback(async () => {
    if (!teamId) return;

    try {
      const response = await axios.post("/api/random", {
        teamId,
      });

      if (response.status === 200) {
        setRandomQuiz(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("랜덤 문제 getRandomQuiz POST 요청에서 오류 발생", error);
        setError("오류가 발생하여 문제를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  }, [teamId]);

  useEffect(() => {
    getRandomQuiz();
  }, [getRandomQuiz]);

  const questionTitle = ["질문 1", "질문 2", "질문 3", "질문 4", "질문 5"];

  return (
    isFourthStep && (
      <div className="flex flex-col space-y-6">
        {randomQuiz.map((quiz) => (
          <div key={quiz.question} className="bg-slate-600 p-2 rounded-lg flex flex-col space-y-2">
            {questionTitle.map((title) => (
              <h2 key={title} className="font-bold text-xl">
                {title}
              </h2>
            ))}
            <p>{quiz.question}</p>
            <span>{quiz.member}님이 답변해주세요.</span>
            {error && <span className="error-text-start">{error}</span>}
          </div>
        ))}
      </div>
    )
  );
};

export default MainContents;
