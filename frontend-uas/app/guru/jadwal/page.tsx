"use client";
import React from "react";
import { Pagination } from "@/components/Pagination";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useJadwalModule from "./lib";
import Filter from "./module/Filter";
import EmptyState from "@/components/NotFound";

const JadwalPage = () => {
  const { useJadwalList } = useJadwalModule();

  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
  } = useJadwalList();

  const { isOpen, onOpen, onClose } = useClosure();

  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row gap-5">
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
          {data?.data && data.data.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pelajaran</th>
                  <th>Nama Pengajar</th>
                  <th>Ruangan</th>
                  <th>Hari</th>
                  <th>Jam Mulai</th>
                  <th>Jam Selesai</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((i, e) => (
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
