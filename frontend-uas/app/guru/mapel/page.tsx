"use client";
import React from "react";
import useMapelModule from "./lib";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { useClosure } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import Filter from "./module/Filter";
import EmptyState from "@/components/NotFound";
import MapelCard from "@/components/MapelCard";

const MapelPage = () => {
  const { useMapelList } = useMapelModule();
  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
  } = useMapelList();
  const { isOpen, onOpen, onClose } = useClosure();

  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <div>
          <button
            className="btn hover:bg-white hover:text-black bg-[#16ab39] text-white"
            onClick={onOpen}
          >
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

      <section className="grid sm:grid-cols-3 gap-4 grid-cols-1">
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
