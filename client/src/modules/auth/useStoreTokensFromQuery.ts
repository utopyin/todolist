import { useEffect } from "react";
import { useRouter } from "next/router";
import useTokenStore from "./useTokenStore";

const storeTokensFromQuery = () => {
  const { query: params, push } = useRouter();

  useEffect(() => {
    if (
      typeof params.accessToken === "string" &&
      typeof params.refreshToken === "string" &&
      params.accessToken && params.refreshToken
    ) {
      useTokenStore.getState().setTokens({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      });
    }
  }, [params, push]);
};

export default storeTokensFromQuery;