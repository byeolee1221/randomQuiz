import { secondStepAtom, thirdStepAtom } from "@/lib/atom";
import { questionSchema } from "@/zodSchema/questionConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AnimateQuestion = () => {
  const isNext = useAtomValue(secondStepAtom);
  const [isThirdStep, setIsThirdStep] = useAtom(thirdStepAtom);

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    mode: "all",
    defaultValues: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const error = form.formState.errors;

  const handleSubmit = async (values: z.infer<typeof questionSchema>) => {
    try {
      const teamId = localStorage.getItem("selectedTeamId");
      const response = await axios.post("/api/question", {
        question: [values.q1, values.q2, values.q3, values.q4, values.q5],
        teamId,
      });

      if (response.status === 201) {
        setIsThirdStep((prev) => !prev);
        form.reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("질문 섞기 api에서 오류 발생", error);
        toast.error("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const inputArr = [
    {
      label: "질문 1 : ",
      name: "q1",
      error: error.q1?.message,
      register: { ...form.register("q1") },
    },
    {
      label: "질문 2 : ",
      name: "q2",
      error: error.q2?.message,
      register: { ...form.register("q2") },
    },
    {
      label: "질문 3 : ",
      name: "q3",
      error: error.q3?.message,
      register: { ...form.register("q3") },
    },
    {
      label: "질문 4 : ",
      name: "q4",
      error: error.q4?.message,
      register: { ...form.register("q4") },
    },
    {
      label: "질문 5 : ",
      name: "q5",
      error: error.q5?.message,
      register: { ...form.register("q5") },
    },
  ];

  return (
    isNext && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isNext ? 1 : 0, y: isNext ? 0 : -20 }}
        transition={{ duration: 1 }}
        className="flex flex-col space-y-6"
      >
        <h2 className="text-center text-xl">3. 질문을 입력해주세요.</h2>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-6">
          {inputArr.map((item) => (
            <div
              key={item.name}
              className="bg-slate-600 py-3 rounded-lg flex items-center justify-center space-x-3"
            >
              <div className="flex flex-col space-y-3">
                <label htmlFor={item.name} className="text-lg font-semibold">
                  {item.label}
                </label>
                <input
                  {...item.register}
                  type="text"
                  id={item.name}
                  name={item.name}
                  autoComplete="off"
                  className={clsx(
                    "border border-gray-900 bg-transparent w-[90%] focus:outline-none text-white rounded-md p-2 resize-none",
                    item.error ? "border-red-500" : ""
                  )}
                />
              </div>
            </div>
          ))}
          <button className="custom-btn">{isLoading ? "문제를 섞고 있어요." : "문제 섞기"}</button>
        </form>
      </motion.div>
    )
  );
};

export default AnimateQuestion;
