"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useGuruModule from "./lib";
import Filter from "./module/Filter";
import Image from "next/image";

const GuruPage = () => {
  const { useGuruList } = useGuruModule();
  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useGuruList();
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
            Filter Guru
          </button>
        </div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title="Filter Guru"
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>
      </div>

      <section className="w-full">
        <div className="rounded-lg bg-white carousel carousel-vertical overflow-y-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Nama Guru</th>
                <th>NIP</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>NoTep</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.data.map((i, e) => {
                  return (
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
                                className=" w-[32px] h-[32px] rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{i.nama_guru}</div>
                          </div>
                        </div>
                      </td>
                      <td>{i.nip}</td>
                      <td>{i.jenisKelamin}</td>
                      <td>{i.alamat}</td>
                      <td>{i.noTelp}</td>

                      <th className="gap-3 flex flex-row">
                        <button
                          className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-500 hover:text-white"
                          onClick={() => {
                            router.push(`/guru/${i.id_guru}/detail`);
                          }}
                        >
                          detail
                        </button>
                      </th>
                    </tr>
                  );
                })}
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
        </div>
      </section>
    </div>
  );
};

export default GuruPage;
