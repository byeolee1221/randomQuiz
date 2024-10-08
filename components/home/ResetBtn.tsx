import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useAtomValue } from "jotai";
import { thirdStepAtom } from "@/lib/atom";
import { motion } from "framer-motion";

const ResetBtn = () => {
  const isFinal = useAtomValue(thirdStepAtom);

  const handleReset = () => {
    window.location.reload();
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isFinal ? 1 : 0, y: isFinal ? 0 : -20 }}
      transition={{ duration: 1 }}
      className="flex flex-col space-y-5 items-center justify-center"
    >
      <button onClick={handleReset} className="custom-btn">다시 만들기</button>
      <Alert variant="destructive">
        <InfoCircledIcon className="w-4 h-4" />
        <AlertTitle>확인</AlertTitle>
        <AlertDescription>다시 만들면 기입했던 정보들이 삭제됩니다.</AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default ResetBtn;
