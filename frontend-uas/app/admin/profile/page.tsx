"use client";
import React from "react";
import { useSession } from "next-auth/react";
import useAuthModule from "@/app/auth/lib";
import ProfileCard from "@/components/ProfileCard";

const Page = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();

  return (
    <ProfileCard 
      profile={profile}
      status={status}
      isFetching={isFetching}
    />
  );
};

export default Page;
