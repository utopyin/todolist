import create from "zustand";
import { combine } from "zustand/middleware";
import isServer from "../../lib/isServer";

const accessTokenKey = "@token";
const refreshTokenKey = "@refresh-token";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || "",
        refreshToken: localStorage.getItem(refreshTokenKey) || ""
      };
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: ""
  };
};

const useTokenStore = create(
  combine(
    getDefaultValues(),
    (set) => ({
      setTokens: (x: { accessToken: string, refreshToken: string }) => {
        try {
          localStorage.setItem(accessTokenKey, x.accessToken);
          localStorage.setItem(refreshTokenKey, x.refreshToken);
        } catch {}

        set(x);
      },
    })
  )
);

export default useTokenStore;