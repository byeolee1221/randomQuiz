import { oneStepAtom, secondStepAtom } from "@/lib/atom";
import { membersSchema } from "@/zodSchema/memberConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AnimateMembers = () => {
  const isNext = useAtomValue(oneStepAtom);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof membersSchema>>({
    resolver: zodResolver(membersSchema),
    mode: "all",
    defaultValues: {
      member1: "",
      member2: "",
      member3: "",
      member4: "",
      member5: null,
    },
  });
  const [isSecondStep, setIsSecondStep] = useAtom(secondStepAtom);

  const inputArr = [
    {
      register: { ...register("member1") },
      name: "member1",
      placeHolder: "팀원1",
      error: errors.member1,
    },
    {
      register: { ...register("member2") },
      name: "member2",
      placeHolder: "팀원2",
      error: errors.member2,
    },
    {
      register: { ...register("member3") },
      name: "member3",
      placeHolder: "팀원3",
      error: errors.member3,
    },
    {
      register: { ...register("member4") },
      name: "member4",
      placeHolder: "팀원4",
      error: errors.member4,
    },
    {
      register: { ...register("member5") },
      name: "member5",
      placeHolder: "팀원5",
      error: errors.member5,
    },
  ];

  const onSubmit = async (values: z.infer<typeof membersSchema>) => {
    try {
      const teamId = localStorage.getItem("selectedTeamId");
      const response = await axios.post(`/api/members`, {
        members: [values.member1, values.member2, values.member3, values.member4, values.member5],
        teamId,
      });

      if (response.status === 200) {
        reset();
        setIsSecondStep((prev) => !prev);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("멤버 등록 api에서 오류 발생", error);
        toast.error("오류가 발생하여 등록되지 않았습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    isNext && !isSecondStep && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isNext ? 1 : 0, y: isNext ? 0 : -20 }}
        transition={{ duration: 1 }}
        className="flex flex-col space-y-6"
      >
        <h2 className="text-center text-xl">2. 팀원의 이름을 적어주세요.</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onError={() => toast.error("입력하신 이름을 확인해주세요.")}
          className="flex flex-col space-y-8"
        >
          <div className="flex items-center justify-between">
            {inputArr.map((item, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <input
                  {...item.register}
                  type="text"
                  name={item.name}
                  className={clsx(
                    "p-2 rounded-lg w-40 text-gray-900",
                    item.error ? "border-2 border-red-500" : ""
                  )}
                  placeholder={item.placeHolder}
                />
              </div>
            ))}
          </div>
          <button type="submit" className="custom-btn" disabled={isSubmitting}>
            {isSubmitting ? "팀원 등록중" : "팀원 등록하기"}
          </button>
        </form>
      </motion.div>
    )
  );
};

export default AnimateMembers;
