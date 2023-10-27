interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  linkText: string;
}

function PricingCard({
  title,
  description,
  price,
  features,
  linkText,
}: PricingCardProps) {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow glassmorph">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-white/80 sm:text-lg ">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{price}</span>
        <span className="text-white/70">/month</span>
      </div>

      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-primary "
              fill="#9918b3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {linkText}
      </a>
    </div>
  );
}

export default PricingCard;
