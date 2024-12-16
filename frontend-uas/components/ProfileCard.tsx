// components/ProfileCard.tsx
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface ProfileData {
  avatar?: string;
  nama?: string;
  email?: string;
  role?: string;
}

interface ProfileCardProps {
  profile?: {
    data: ProfileData;
  };
  status?: string;
  isFetching?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, status, isFetching }) => {
  const router = useRouter();
  // Di ProfileCard.tsx, tambahkan logika untuk mengarahkan berdasarkan role
const handleUpdateProfile = () => {
  if (profile?.data.role === "admin") {
    router.push("/admin/update/profile");
  } else if (profile?.data.role === "guru") {
    router.push("/guru/update/profile");
  } else if (profile?.data.role === "siswa") {
    router.push("/siswa/update/profile");
  }
};

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex flex-row justify-between">
          <h3 className="text-lg leading-6 text-black font-bold">
            User Profile
          </h3>
          <Image
            src={profile?.data.avatar || ""}
            alt="photo profile"
            width={96}
            height={96}
            className="w-[32px] h-[32px] rounded-full"
          />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                {profile?.data.nama || "Loading..."}
              </dd>
            </div>
            <div className="bg-white dark:bg-[#16ab39] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-white">Email</dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                {profile?.data.email || "Loading..."}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
                {profile?.data.role || "Loading..."}
              </dd>
            </div>
            <div className="bg-white dark:bg-[#16ab39] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-white">Status</dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                {status}
              </dd>
            </div>
            <button
              className="btn bg-[#16ab39] text-white hover:bg-white hover:text-[#16ab39] m-5"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </dl>
        </div>
        {/* <div className="px-4 py-4 sm:px-6 flex justify-end">
          <Button
            title="Logout"
            colorSchema="red"
            onClick={() => signOut()}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;