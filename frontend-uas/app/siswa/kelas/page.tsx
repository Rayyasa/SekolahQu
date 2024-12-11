"use client";
import React from "react";
import useKelasModule from "./lib";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import Filter from "./module/Filter";
import KelasCard from "@/components/KelasCard";

const KelasPage = () => {
  const { useKelasList } = useKelasModule();

  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useKelasList();
  const router = useRouter();
  console.log(data);

  const { isOpen, onOpen, onClose } = useClosure();
  const handleDetail = (id: number) => {
    router.push(`/siswa/kelas/${id}/detail`);
  };
  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <div>
          <button
            className="btn hover:bg-white hover:text-black bg-[#16ab39] text-white"
            onClick={onOpen} // Memanggil fungsi onOpen saat tombol diklik
          >
            {/* Tambahkan ikon atau teks untuk tombol */}
            Filter Kelas
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Kelas"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="grid sm:grid-cols-3 gap-4 grid-cols-1">
        {data?.data
          .sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas))
          .map((item, index) => {
            return (
              <KelasCard
              key={index}
              nama_kelas={item.nama_kelas}
              Jurusan={item.Jurusan}
              id_kelas={item.id_kelas || 0}
              onDetail={handleDetail} 
              // onDelete={handleDelete}
            />
            );
          })}
      </section>
      <Pagination
        page={params.page}
        pageSize={params.pageSize}
        handlePageSize={handlePageSize}
        handlePage={handlePage}
        pagination={data?.pagination}
      />
    </div>
  );
};

export default KelasPage;
