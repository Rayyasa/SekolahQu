import React from "react";

export default function NotAcces() {
  return (
    <main id="content">
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8 m-auto w-1/2 h-full my-48">
        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl ">
          403
        </h1>
        <p className="mt-3 text-gray-600 dark:text-neutral-400">
          Oops, sesuatu yang salah telah terjadi
        </p>
        <p className="text-gray-700 dark:text-neutral-400">
          Kamu tidak memiliki Akses Ke Halaman ini
        </p>
        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <a
            className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39]  text-white hover:bg-white hover:text-gray-600  hover:outline disabled:opacity-50 disabled:pointer-events-none"
            href="/auth/login"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali Ke Login
          </a>
        </div>
      </div>
    </main>
  );
}
