import { Tilt } from "react-tilt";
import K from "@/constants";
import { Card, CardContent } from "@/components/ui";

const Features = () => {
  const defaultOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };
  return (
    <div className="flex flex-col lg:px-8 w-full justify-center items-center text-center">
      <h3 className="text-white text-4xl font-bold">Features</h3>

      <div className="mt-10 lg:mt-20">
        <div className="mx-auto grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {K.FEATURES.map((feature, index) => (
            <Tilt options={defaultOptions} key={index}>
              <Card className="bg-opacity-10 glassmorph h-[400px]" key={index}>
                <img src={feature.image} alt="feature-image" className="mb-8" />
                <CardContent className="">
                  <p className="text-left mb-3 text-xl font-semibold">
                    {feature.name}
                  </p>
                  <p className="text-white/60 text-left">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
