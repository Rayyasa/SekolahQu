"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import useAuthModule from "@/app/auth/lib";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
const Page = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <ProfileCard 
    profile={profile}
    status={status}
    isFetching={isFetching}
  />
  );
};

export default Page;
