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
import { DeleteButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useSiswaModule from "./lib";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import InputText from "@/components/InputText";
import useJadwalModule from "./lib";
import { Hari, JadwalCreatePayload } from "./interface";
import Filter from "./module/Filter";
import EmptyState from "@/components/NotFound";
const JadwalPage = () => {
  const { useJadwalList, useDeleteJadwal } = useJadwalModule();

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
