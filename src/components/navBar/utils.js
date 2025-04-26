import { routes } from "@/utils/constants";

export const logout = (navigate) => {
  sessionStorage.clear();
  navigate(routes.home);
};
