"use client";
import React from "react";
import useKelasModule from "./lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import BgKelas from "@/assets/green-color-school-supplies-arranged-circular-shape-yellow-background.jpg";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import { Jurusan, KelasCreatePayload, NamaKelas } from "../kelas/interface";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import Filter from "./module/Filter";
import KelasCard from "@/components/KelasCard";
import Modal from "@/components/Modal";
import EmptyState from "@/components/NotFound";

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
  const { isOpen, onOpen, onClose } = useClosure();

  const handleDetail = (id: number) => {
    router.push(`/guru/kelas/${id}/detail`);
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

      <section className="grid grid-cols-3 gap-4">
        {data?.data && data.data.length > 0 ? (
          data.data
            .sort((a, b) => a.nama_kelas.localeCompare(b.nama_kelas))
            .map((item, index) => (
              <KelasCard
                key={index}
                nama_kelas={item.nama_kelas}
                Jurusan={item.Jurusan}
                id_kelas={item.id_kelas || 0}
                onDetail={handleDetail}
                // onDelete={handleDelete}
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

export default KelasPage;
