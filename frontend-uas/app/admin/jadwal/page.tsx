"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useJadwalModule from "./lib";
import Filter from "./module/Filter";
import EmptyState from "@/components/NotFound";
const JadwalPage = () => {
  const { useJadwalList, useDeleteJadwal } = useJadwalModule();
  const { mutate: deleteMutate, isLoading: isLoadingDelete } =
    useDeleteJadwal();

  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useJadwalList();
  const router = useRouter();
  console.log(data);
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      deleteMutate(id);
    },
  });
  const { isOpen, onOpen, onClose } = useClosure();
  console.log(data);
  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row px-4 gap-5">
        <div>
          <button
            className="btn btn-circle "
            onClick={() => {
              router.push("/admin/jadwal/tambah");
            }}
          >
            <PlusCircleIcon color="#16ab39" />
          </button>
        </div>
        <div>
          <button
            className="btn hover:bg-white hover:text-black bg-[#16ab39] text-white"
            onClick={onOpen} // Memanggil fungsi onOpen saat tombol diklik
          >
            {/* Tambahkan ikon atau teks untuk tombol */}
            Filter Jadwal
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Jadwal"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="w-full">
        <div className="rounded-lg bg-white carousel carousel-vertical overflow-y-auto w-full">
          {data && data?.data && data.data.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pelajaran</th>
                  <th>Nama Pengajar</th>
                  <th>Ruangan</th>
                  <th>Hari</th>
                  <th>Jam Mulai</th>
                  <th>Jam Selesai</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((i, e) => (
                  <tr key={e}>
                    <td>{(params.page - 1) * params.pageSize + e + 1}</td>
                    <td>{i.mapel.nama_mapel}</td>
                    <td>{i.mapel.guru.nama_guru}</td>
                    <td>
                      {i.kelas.nama_kelas} - {i.kelas.Jurusan}
                    </td>
                    <td>{i.hari}</td>
                    <td>{i.jam_mulai}</td>
                    <td>{i.jam_selesai}</td>

                    <th className="gap-3 flex flex-row">
                      <button
                        className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          router.push(`/admin/jadwal/${i.id_jadwal}/update`);
                        }}
                      >
                        detail
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-white hover:bg-white hover:text-red-500 bg-red-500"
                        onClick={() => {
                          handleDelete(i.id_jadwal || 0);
                        }}
                      >
                        hapus
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

export default JadwalPage;
