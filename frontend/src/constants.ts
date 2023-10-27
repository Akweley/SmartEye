import {
  web,
  instagram,
  twitter,
  guest,
  admin,
  student,
  featOne,
  featTwo,
  featThree,
  featFour,
} from "@/assets";
export default {
  SOCIAL: [
    { icon: web, url: "" },
    { icon: instagram, url: "" },
    { icon: twitter, url: "" },
  ],
  FEATURES: [
    {
      name: "Smart Contracts",
      image: featOne,
      description:
        "VerifyEd uses Ethereum smart contracts with the Contract Factory Pattern, ensuring data separation and robust security for each school.",
    },
    {
      name: "IPFS Integration",
      image: featTwo,
      description:
        "We enhance security by uploading transcript hashes to the blockchain for integrity and storing documents on IPFS for reliable access.",
    },
    {
      name: "Layer 2 Security",
      image: featThree,
      description:
        "For an added layer of security, VerifyEd allows students to include their public keys which verifies must match before access.",
    },
    {
      name: "User-Friendly Interface",
      image: featFour,
      description:
        "VerifyEd's interface is all about you. It's intuitive, easy to use, and accessible, making your experience seamless.",
    },
  ],
  LOGIN_OPTIONS: [
    {
      role: "Admin",
      icon: admin,
      subText: "Schools must be added to the platform first. Sign up here",
    },
    {
      role: "Student",
      icon: student,
      subText: "Students must be registered by their school admins first",
    },
    {
      role: "Guest",
      icon: guest,
      subText:
        "Guests must be approved by students before they can view their profile",
    },
  ] as LoginOptionsType[],
};

export type LoginOptionsType = {
  role: "Admin" | "Student" | "Guest";
  icon: string;
  subText: string;
};
