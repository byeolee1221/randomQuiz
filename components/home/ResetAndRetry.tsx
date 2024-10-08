import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useAtom, useAtomValue } from "jotai";
import { oneStepAtom, secondStepAtom, thirdStepAtom } from "@/lib/atom";
import { motion } from "framer-motion";
import { getRandomQuiz } from "@/lib/utils";
import { IRandomQuiz } from "@/types/typeShare";

interface IProps {
  teamId: string | null;
  setRandomQuiz: React.Dispatch<React.SetStateAction<IRandomQuiz[]>>;
}

const ResetAndRetry = ({ teamId, setRandomQuiz }: IProps) => {
  const isFinal = useAtomValue(thirdStepAtom);
  const [oneStep, setOneStep] = useAtom(oneStepAtom);
  const [secondStep, setSecondStep] = useAtom(secondStepAtom);

  const handleReset = () => {
    localStorage.removeItem("selectedTeamId");
    window.location.reload();
    setOneStep(false);
    setSecondStep(false);
  };

  const handleRetry = () => {
    getRandomQuiz({ teamId, setRandomQuiz });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isFinal ? 1 : 0, y: isFinal ? 0 : -20 }}
      transition={{ duration: 1 }}
      className="flex flex-col space-y-5 items-center justify-center"
    >
      <div className="flex items-center space-x-5">
        <button onClick={handleReset} className="custom-btn">
          새로 만들기
        </button>
        <button onClick={handleRetry} className="custom-btn">
          다시 섞기
        </button>
      </div>
      <Alert variant="destructive">
        <InfoCircledIcon className="w-4 h-4" />
        <AlertTitle>확인</AlertTitle>
        <AlertDescription>새로 만들면 기입했던 정보들이 삭제됩니다.</AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default ResetAndRetry;
