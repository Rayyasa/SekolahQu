"use client";
import React from "react";
import useKelasModule from "./lib";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import Image from "next/image";
import BgMapel from "@/assets/green-desk-with-stationery-top-view-copypace.jpg";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useMapelModule from "./lib";
import Filter from "./module/Filter";
import MapelCard from "@/components/MapelCard";
import EmptyState from "@/components/NotFound";

const MapelPage = () => {
  const { useMapelList, useDeleteMapel, optionguru } = useMapelModule();

  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useMapelList();
  const router = useRouter();
  console.log(data?.data.length);
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
            Filter MataPelajaran
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Mapel"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="grid grid-cols-1  sm:grid-cols-3 gap-4">
        {data?.data && data.data.length > 0 ? (
          data.data.map((item, index) => (
            <MapelCard
            key={index}
            id_mapel={item.id_mapel || 0}
            nama_mapel={item.nama_mapel}
            guru={item.guru}
          />
          ))
        ) : (
          <EmptyState />
        )}
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

export default MapelPage;
