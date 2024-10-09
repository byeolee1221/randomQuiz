import { motion } from "framer-motion";
import useTimer from "@/hooks/useTimer";
import { useAtomValue } from "jotai";
import { thirdStepAtom } from "@/lib/atom";

const AnimateParagraph = () => {
  const isVisible = useTimer(300);
  const isFinal = useAtomValue(thirdStepAtom);

  return (
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 1 }}
      className="text-center text-2xl"
    >
      {isFinal ? "이제 질문을 시작해보세요!" : "아래 단계를 따라 진행하세요."}
    </motion.p>
  );
};

export default AnimateParagraph;
