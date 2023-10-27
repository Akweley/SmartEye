import { instagram, guest, admin } from "@/assets";
export default {
  SOCIAL: [{ icon: instagram, url: "" }],
  FEATURES: [],
  LOGIN_OPTIONS: [
    {
      role: "Admin",
      icon: admin,
      subText: "Schools must be added to the platform first. Sign up here",
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
