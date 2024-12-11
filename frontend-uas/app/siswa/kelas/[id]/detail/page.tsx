"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useSiswaModule from "@/app/admin/siswa/lib";
import Image from "next/image";
import BgKelas from "@/assets/green-color-school-supplies-arranged-circular-shape-yellow-background.jpg";
import LoadingPage from "@/components/LoadingPage";
import useKelasModule from "../../lib";
import { useConfirmDelete } from "@/Hook";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import EmptyState from "@/components/NotFound";
const KelasDetail = ({ params }: { params: { id: string } }) => {
  const { useDetailKelas } = useKelasModule();
  const router = useRouter();
  const { data, isLoading } = useDetailKelas(params.id);
  console.log(data);
  if (isLoading) return LoadingPage;
  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <Link href={"/siswa/kelas"}>
        <span className="flex items-center">
          {" "}
          <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
          Kembali
        </span>
      </Link>
      <div className="flex flex-row px-4 gap-5">
        <h1 className="text-2xl font-bold">
          {data?.data?.kelas.nama_kelas} - {data?.data?.kelas.Jurusan}
        </h1>
      </div>
      <section className="w-full">
        <div className="rounded-lg bg-white carousel carousel-vertical overflow-y-auto w-full">
          {data && data.data.siswa.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>Nilai</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.siswa.map((i: any, e: any) => {
                  return (
                    <tr key={e}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src={data?.data.photo || "/download.png"}
                                alt="photo profile"
                                width={96}
                                height={96}
                                className=" w-[32px] h-[32px] rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{i.nama_siswa}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs text-green-400 hover:bg-green-400 hover:text-white"
                          onClick={() => {
                            router.push(`/siswa/nilai/${i.id_siswa}/detail`);
                          }}
                        >
                          Lihat Nilai
                        </button>
                      </td>

                      <th className="gap-3 flex flex-row">
                        <button
                          className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-500 hover:text-white"
                          onClick={() => {
                            router.push(`/siswa/${i.id_siswa}/detail`);
                          }}
                        >
                          detail
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </div>
  );
};

export default KelasDetail;
