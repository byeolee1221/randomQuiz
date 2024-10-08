import { IRandomQuiz } from "@/types/typeShare";
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface IQuiz {
  teamId: string | null;
  setRandomQuiz: React.Dispatch<React.SetStateAction<IRandomQuiz[]>>
}

export const getRandomQuiz = async ({ teamId, setRandomQuiz }: IQuiz) => {
  if (!teamId) return;

  try {
    const response = await axios.get(`/api/random?teamId=${teamId}`);

    if (response.status === 200) {
      setRandomQuiz(response.data.assignedAnswer);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("랜덤 문제 getRandomQuiz POST 요청에서 오류 발생", error);
      toast.error(error.response?.data.message);
    }
  }
}