import useTimer from "@/hooks/useTimer";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAtom } from "jotai";
import { oneStepAtom } from "@/lib/atom";

const AnimateSelectTeam = () => {
  const isVisible = useTimer(1200);
  const [selectOption, setSelectOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useAtom(oneStepAtom);

  const handleChangeOption = (value: string) => {
    setSelectOption(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/api/team", {
        team: selectOption,
      });

      if (response.status === 201) {
        const teamId = response.data.team._id;
        localStorage.setItem("selectedTeamId", teamId);
        setIsNext((prev) => !prev);
        setSelectOption("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("팀 선택 api 오류 발생", error);
        toast.error("오류가 발생했으니 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    !isNext && (
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 1 }}
        className="flex flex-col space-y-6 items-center justify-center"
      >
        <h2 className="text-center text-xl">1. 팀을 선택해주세요.</h2>
        <Select onValueChange={handleChangeOption}>
          <SelectTrigger className="w-56 h-12 text-base">
            <SelectValue placeholder="현재 팀을 선택해주세요." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>팀 선택</SelectLabel>
              <SelectItem value="1팀">1팀</SelectItem>
              <SelectItem value="2팀">2팀</SelectItem>
              <SelectItem value="3팀">3팀</SelectItem>
              <SelectItem value="4팀">4팀</SelectItem>
              <SelectItem value="5팀">5팀</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button type="submit" className="custom-btn">
          {isLoading ? "저장중" : "저장"}
        </button>
      </motion.form>
    )
  );
};

export default AnimateSelectTeam;
