import { motion } from "framer-motion";

import { slideIn } from "@/lib/motion";
import fiveStar from "@/assets/five-star.svg";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardContent } from "@/components/ui";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`xl:mt-4 flex xl:flex-row justify-center flex-col gap-10 overflow-hidden min-h-screen px-10`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex p-8 rounded-2xl w-full xl:w-1/2 flex-col items-center xl:items-start justify-center"
      >
        <h1 className="text-7xl mb-4 lg:mb-8 font-bold tracking-normal text-center xl:text-left text-gradient !bg-clip-text text-transparent">
          Revolutionizing Student Transcript Verification
        </h1>
        <p className="text-white font-medium text-2xl text-center xl:text-left">
          All your transcripts and academic documents verified <br /> and done
          right in one place
        </p>
        <Button
          className="gap-x-3 mt-8 btn-gradient py-4 px-8 text-xl shadow-lg"
          size="lg"
          onClick={() => navigate("/signup")}
        >
          Get Started
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 6L1.5 6M14.5 6L9.66279 1.5M14.5 6L9.66279 10.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Button>
        <div className="flex flex-row items-center mt-4 gap-x-3">
          <img src={fiveStar} className="" />
          <p className="text-white text-sm">
            based on 10,000+ reviews from students
          </p>
        </div>
        <div className="flex flex-col mt-8 gap-y-6">
          <p className="text-white font-bold text-center xl:text-left">
            We're Trusted by
          </p>
          <div className="flex gap-x-6 ">
            <Card className="w-36 bg-opacity-10 glassmorph">
              <CardHeader className="font-bold text-center text-xs uppercase pb-0">
                Schools
              </CardHeader>
              <CardContent className="text-center font-extrabold text-2xl">
                255
              </CardContent>
            </Card>
            <Card className="w-36 glassmorph">
              <CardHeader className="font-bold  text-center text-xs uppercase pb-0">
                Students
              </CardHeader>
              <CardContent className="text-center font-extrabold text-2xl">
                12K +
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] hidden xl:block"
      ></motion.div>
    </div>
  );
};

export default Hero;
