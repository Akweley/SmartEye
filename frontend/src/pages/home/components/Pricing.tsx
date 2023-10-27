import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <section className="glassmorph hover:bg-opacity-10 rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-10">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
            Designed for institutions like yours
          </h2>
          <p className="mb-5 sm:text-xl text-black/80 font-light">
            Here at <span className="font-semibold">SmartEye&#8482;</span> we
            focus on institutions where technology, innovation, and capital can
            unlock long-term value and drive academic growth.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <PricingCard
            title="Individual"
            description="Best option for personal use & for your next project."
            price="GHS0"
            features={[
              "Individual configuration",
              "No setup, or hidden fees",
              "Team size: 1 developer",
              "Premium support: 6 months",
              "Free updates: 6 months",
            ]}
            linkText="Get started"
          />

          <PricingCard
            title="Institution"
            description="Relevant for multiple users, extended & premium support."
            price="GHS49"
            features={[
              "Individual configuration",
              "No setup, or hidden fees",
              "Team size: 10 developers",
              "Premium support: 24 months",
              "Free updates: 24 months",
            ]}
            linkText="Get started"
          />

          <PricingCard
            title="Enterprise"
            description="Best for large scale uses and extended redistribution rights."
            price="GHS99"
            features={[
              "Individual configuration",
              "No setup, or hidden fees",
              "Team size: 100+ developers",
              "Premium support: 36 months",
              "Free updates: 36 months",
            ]}
            linkText="Get started"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
