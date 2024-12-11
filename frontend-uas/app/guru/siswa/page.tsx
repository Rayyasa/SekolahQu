"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import Image from "next/image";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useSiswaModule from "./lib";
import { SiswaCreatePayload, jenis_kelamin } from "./interface";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import InputText from "@/components/InputText";
import Filter from "./module/Filter";
import EmptyState from "@/components/NotFound";
const SiswaPage = () => {
  const { useSiswaList, useDeleteSiswa, useCreateSiswa, optionKelas } =
    useSiswaModule();
  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useSiswaList();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useClosure();
  console.log(data);
  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <div>
          <button
            className="btn hover:bg-white hover:text-black bg-[#16ab39] text-white"
            onClick={onOpen} // Memanggil fungsi onOpen saat tombol diklik
          >
            {/* Tambahkan ikon atau teks untuk tombol */}
            Filter Siswa
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Siswa"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="w-full">
        <div className="rounded-lg bg-white carousel carousel-vertical overflow-y-auto w-full">
          {data?.data && data.data.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>NISN</th>
                  <th>Jenis Kelamin</th>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((i, e) => (
                  <tr key={e}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              src={i.photo || "/download.png"}
                              alt="photo profile"
                              width={96}
                              height={96}
                              className="w-[32px] h-[32px] rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{i.nama_siswa}</div>
                        </div>
                      </div>
                    </td>
                    <td>{i.nisn}</td>
                    <td>{i.jenis_kelamin}</td>
                    <td>{i.kelas.nama_kelas}</td>
                    <td>{i.kelas.Jurusan}</td>
                    <th className="gap-3 flex flex-row">
                      <button
                        className="btn btn-ghost btn-xs bg-green-400 text-white hover:bg-white hover:text-green-400"
                        onClick={() => {
                          router.push(`/guru/nilai/${i.id_siswa}/detail`);
                        }}
                      >
                        Lihat Nilai
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          router.push(`/guru/siswa/${i.id_siswa}/update`);
                        }}
                      >
                        detail
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <Pagination
                  page={params.page}
                  pageSize={params.pageSize}
                  handlePageSize={handlePageSize}
                  handlePage={handlePage}
                  pagination={data?.pagination}
                />
              </tfoot>
            </table>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </div>
  );
};

export default SiswaPage;
