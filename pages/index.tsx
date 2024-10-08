import AnimateMembers from "@/components/home/AnimateMembers";
import AnimateParagraph from "@/components/home/AnimateParagraph";
import AnimateQuestion from "@/components/home/AnimateQuestion";
import AnimateSelectTeam from "@/components/home/AnimateSelectTeam";
import MainContents from "@/components/home/MainContents";
import { thirdStepAtom } from "@/lib/atom";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const isThirdStep = useAtomValue(thirdStepAtom);
  const [teamId, setTeamId] = useState<string | null>("");
  
  useEffect(() => {
    if (isThirdStep) {
      const checkStorage = localStorage.getItem("selectedTeamId");
      setTeamId(checkStorage);
    }
  }, [isThirdStep]);

  return (
    <div className="w-2/4 m-auto py-20 flex flex-col space-y-10">
      <div className="flex items-center space-x-3 justify-center">
        <Image src="/icons/logo.png" alt="로고" width={60} height={60} />
        <h1 className="text-5xl">랜덤퀴즈 순위정하기</h1>
      </div>
      <AnimateParagraph />
      <AnimateSelectTeam />
      <AnimateMembers />
      <AnimateQuestion />
      {isThirdStep && <MainContents teamId={teamId} />}
    </div>
  );
}

export default Home;