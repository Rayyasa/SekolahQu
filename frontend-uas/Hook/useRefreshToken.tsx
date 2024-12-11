import { axiosClientRefresh } from "@/Hook/lib/axiosClient";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect } from "react";
import { useToast } from ".";

interface SessionUser {
  id: number;
  refreshToken: string;
  accessToken: string;
  name: string;
  email: string;
}

export const useRefreshToken = () => {
  const { data: session, update } = useSession();
  const { toastWarning } = useToast();

  useEffect(() => {
    const requestIntercept = axiosClientRefresh.interceptors.request.use(
      (config: any) => {
        config.headers[
          "Authorization"
        ] = `Bearer ${session?.user?.refreshToken}`;
        config.headers.id = session?.user?.id;

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosClientRefresh.interceptors.response.use(
      async (response: any) => response,
      async (error: any) => {
        toastWarning(error.response.message);
        signOut();
        window.location.replace("/auth/login");
      }
    );

    return () => {
      axiosClientRefresh.interceptors.request.eject(requestIntercept);
      axiosClientRefresh.interceptors.response.eject(responseIntercept);
    };
  }, [session, toastWarning]);

  const refreshToken = async () => {
    if (!session) return;

    try {
      const { user } = session as Session & { user: SessionUser };

      // const user = session.user

      const res = await axiosClientRefresh.get("/auth/refresh-token");

      console.log("res", res.data);
      await update({
        ...session,
        user: {
          ...user,
          accessToken: res.data.data.access_token,
          refreshToken: res.data.data.refresh_token,
        },
      });

      return true;
    } catch {
      return false;
    }
  };

  return { refreshToken };
};
