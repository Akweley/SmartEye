import { Button } from "@/components/ui";

const Hero = () => {
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
        <Button className="font-bold rounded-3xl">Get Started</Button>
        <Button
          className="font-bold border-primary bg-transparent rounded-3xl"
          variant="outline"
        >
          Book a Demo
        </Button>
      </div>

      {/* <div className="w-full overflow-hidden">
        <motion.div
          className="flex flex-row gap-x-8"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        >
          <img src="image1.jpg" alt="Image 1" />
          <img src="image2.jpg" alt="Image 2" />
          <img src="image3.jpg" alt="Image 3" />
          
        </motion.div>
      </div> */}

      <div className="flex xl:gap-20 gap-16 lg:px-8 w-full p-16 xl:p-20 justify-center items-center text-center hover:bg-opacity-10 rounded-lg">
        <div className="p-4 rounded-lg border border-[#f59e0b]">
          <h3 className="text-2xl font-bold mb-3">Title</h3>
          <p className="">
            decentralized application (DApp) that leverages blockchain
          </p>
        </div>

        <div className="p-4 rounded-lg border border-[#f59e0b]">
          <h3 className="text-2xl font-bold mb-3">Title</h3>
          <p className="">
            decentralized application (DApp) that leverages blockchain
          </p>
        </div>

        <div className="p-4 rounded-lg border border-[#f59e0b]">
          <h3 className="text-2xl font-bold mb-3">Title</h3>
          <p className="">
            decentralized application (DApp) that leverages blockchain
          </p>
        </div>
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
