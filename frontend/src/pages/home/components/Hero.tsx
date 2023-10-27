import { motion } from "framer-motion";

import { slideIn } from "@/lib/motion";
import fiveStar from "@/assets/five-star.svg";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardContent, Input } from "@/components/ui";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Simplify fraud detection with <br className="max-md:hidden" />
        <span className="orange_gradient text-center">SmartEyes</span>
      </h1>
      <p className="desc text-center">
        SmartEyes is a blockchain-based anti money laundering solution that
        helps detect fraudulent activities during transactions.
      </p>

      <div className="flex items-center gap-x-6 my-8">
        <Button className="" type="button">
          Button
        </Button>
        <Button className="" type="button">
          Button
        </Button>
      </div>
    </section>
  );
};

export default Hero;

{
  /* <motion.div
variants={slideIn("left", "tween", 0.2, 1)}
className="flex p-8 rounded-2xl w-full xl:w-1/2 flex-col items-center xl:items-start justify-center"
> */
}
