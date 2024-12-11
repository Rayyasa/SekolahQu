"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import useAuthModule from "../auth/lib";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import Image from "next/image";
import Header from "@/components/Header";
export default function AdminLayout({ children }: { children: ReactNode }) {
  const menus = [
    {
      label: "Home",
      route: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12ZM12 17.99v-3"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      label: "Kelas",
      route: "kelas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.63 7.15c.04.61-.01 1.3-.13 2.07l-.73 4.69c-.62 3.91-2.43 5.23-6.34 4.62l-4.69-.74c-1.35-.21-2.39-.57-3.15-1.11-1.45-1.01-1.87-2.67-1.47-5.23l.74-4.69c.62-3.91 2.43-5.23 6.34-4.62l4.69.74c3.14.49 4.61 1.77 4.74 4.27Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M20.5 13.47 19 17.98c-1.25 3.76-3.25 4.76-7.01 3.51l-4.51-1.5c-2.27-.75-3.53-1.79-3.89-3.31.76.54 1.8.9 3.15 1.11l4.69.74c3.91.61 5.72-.71 6.34-4.62l.73-4.69c.12-.77.17-1.46.13-2.07 2.39 1.27 2.91 3.19 1.87 6.32ZM8.24 8.98a1.74 1.74 0 1 0 0-3.48 1.74 1.74 0 0 0 0 3.48Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      label: "Jadwal",
      route: "jadwal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M15.695 13.7h.009M15.695 16.7h.009M11.995 13.7h.01M11.995 16.7h.01M8.294 13.7h.01M8.294 16.7h.01"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      label: "Mata Pelajaran",
      route: "mapel",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 16.74V4.67c0-1.2-.98-2.09-2.17-1.99h-.06c-2.1.18-5.29 1.25-7.07 2.37l-.17.11c-.29.18-.77.18-1.06 0l-.25-.15C9.44 3.9 6.26 2.84 4.16 2.67 2.97 2.57 2 3.47 2 4.66v12.08c0 .96.78 1.86 1.74 1.98l.29.04c2.17.29 5.52 1.39 7.44 2.44l.04.02c.27.15.7.15.96 0 1.92-1.06 5.28-2.17 7.46-2.46l.33-.04c.96-.12 1.74-1.02 1.74-1.98ZM12 5.49v15M7.75 8.49H5.5M8.5 11.49h-3"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      label: "Profil Akun",
      route: "profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Header profile={profile} />

      {/* ========== MAIN CONTENT ========== */}
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
        <div className="flex justify-between items-center py-2">
          {/* Sidebar */}
          <button
            type="button"
            className="py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
            </svg>
            <span className="sr-only">Sidebar</span>
          </button>
          {/* End Sidebar */}
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        id="application-sidebar"
        className={clsx(
          " transition-all duration-300 transform w-[200px] sm:w-[260px] fixed inset-y-0 start-0 z-[60] bg-[#16ab39] border-e border-gray-200 lg:translate-x-0 lg:end-auto lg:bottom-0",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className="px-2 sm:px-8 pt-4 items-center">
          <a
            className="flex-none rounded-xl text-2xl sm:text-3xl inline-block font-extrabold focus:outline-none focus:opacity-80 text-white"
            aria-label="MySchool"
          >
            SekolahQu
          </a>
        </div>
        <nav
          className="hs-accordion-group p-3 sm:p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open=""
        >
          <ul className="space-y-5">
            {menus.map((e, i) => {
              const isActive = pathname === `/siswa/${e.route}`;
              return (
                <button
                  key={i}
                  className={clsx(
                    "w-full flex items-center justify-between py-2 sm:py-3 px-3 bg-white rounded-lg hover:bg-gray-300 text-black sm:text-base transition-all font-bold text-sm",
                    {
                      "bg-white hover:bg-[#16ab39]": !isActive,
                      "bg-red-500 hover:bg-[#16ab39]": isActive,
                    }
                  )}
                  onClick={() => {
                    router.push(`/siswa/${e.route}`);
                    closeSidebar(); // Menutup sidebar setelah mengklik menu
                  }}
                >
                  {e.label}
                  {e.icon}
                </button>
              );
            })}
            <Button
              title="Logout"
              colorSchema="red"
              width="sm"
              onClick={() => {
                signOut({ redirect: false });
                router.push("/auth/login");
                closeSidebar();
              }}
            />
          </ul>
        </nav>
      </div>

      {/* End Sidebar */}
      {/* Content */}
      <div className="w-full lg:ps-64 overflow-x-hidden">
        <div className="">{children}</div>
      </div>
      {/* End Content */}
      {/* ========== END MAIN CONTENT ========== */}
    </>
  );
}
