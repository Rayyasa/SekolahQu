// components/Header.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  profile?: {
    data: {
      nama: string;
      role: string; 
      avatar: string;
    }
  }
}

export default function Header({ profile }: HeaderProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    switch(profile?.data.role?.toLowerCase()) {
      case 'admin':
        router.push("/admin/profile");
        break;
      case 'guru':
        router.push("/guru/profile"); 
        break;
      case 'siswa':
        router.push("/siswa/profile");
        break;
      default:
        router.push("/profile");
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-2 lg:ps-64">
      <nav
        className="flex basis-full items-center w-full mx-auto px-5 py-2 sm:px-6"
        aria-label="Global"
      >
        <div className="w-full flex items-center justify-end ms-auto sm:justify-end sm:gap-x-3 sm:order-3">
          <div className="flex flex-row items-center justify-end gap-3">
            <section>
              <p className="text-gray-600 font-semibold text-base">
                {profile?.data.nama} - {profile?.data.role}
              </p>
            </section>
            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
              <button
                id="hs-dropdown-with-header"
                type="button"
                className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleProfileClick}
              >
                <Image
                  src={profile?.data.avatar || ""}
                  alt="photo profile"
                  width={96}
                  height={96}
                  className="w-[32px] h-[32px] rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}