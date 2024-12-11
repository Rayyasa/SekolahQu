"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import { jenis_kelamin } from "./interface";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import InputText from "@/components/InputText";
import { CreateGuruPayload } from "./interface";
import useGuruModule from "./lib";
import Filter from "./module/Filter";
import Image from "next/image";
import Modal from "@/components/Modal";

const GuruPage = () => {
  const { useGuruList, useCreateGuru, useDeleteGuru } = useGuruModule();
  const { mutate: deleteMutate, isLoading: isLoadingDelete } = useDeleteGuru();
  const { mutate: createMutate, isLoading: isLoadingCreate } = useCreateGuru();
  const createGuruSchema = yup.object({
    nama_guru: yup.string().nullable().default("").required("Wajib diisi!"),
    nip: yup.string().nullable().default("").required("Wajib diisi!"),
    jenisKelamin: yup.string().nullable().default("").required("Wajib diisi!"),
    noTelp: yup.string().nullable().default("").required("Wajib diisi!"),
    alamat: yup.string().nullable().default("").required("Wajib diisi!"),
    photo: yup.string().nullable().default("").required("Wajib diisi!"),
  });
  const gender = [
    {
      value: jenis_kelamin.L,
      label: "Laki-Laki",
    },
    {
      value: jenis_kelamin.P,
      label: "Perempuan",
    },
  ];
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

  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      deleteMutate(id);
    },
  });
  const formik = useFormik<CreateGuruPayload>({
    initialValues: createGuruSchema.getDefault(),
    validationSchema: createGuruSchema,
    enableReinitialize: true,
    onSubmit: async (values: CreateGuruPayload) => createMutate(values),
  });
  const {
    values,
    setValues,
    resetForm,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;
  const { isOpen, onOpen, onClose } = useClosure();
  console.log(data);
  return (
    <div className="mx-5 py-10 flex flex-col gap-5">
      <div className="flex flex-row px-4 gap-5">
        <div>
          <button
            className="btn btn-circle "
            onClick={() =>
              (document.getElementById("my_modal_1") as any)!.showModal()
            }
          >
            <PlusCircleIcon color="#16ab39" />
          </button>
          <Modal id="my_modal_1" title="Tambah Kelas">
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <section>
                  <Label htmlFor="nip" title="NIP" />
                  <InputText
                    value={values.nip}
                    placeholder="nip"
                    id="nip"
                    name="nip"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.nip}
                    messageError={errors.nip}
                  />
                </section>
                <section>
                  <Label htmlFor="nama_guru" title="nama guru" />
                  <InputText
                    value={values.nama_guru}
                    placeholder="nama guru"
                    id="nama_guru"
                    name="nama_guru"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.nama_guru}
                    messageError={errors.nama_guru}
                  />
                </section>

                <section>
                  <Label htmlFor="jenisKelamin" title="Jenis Kelamin" />
                  <Select
                    value={values.jenisKelamin}
                    id="jenisKelamin"
                    name="jenisKelamin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={gender}
                    isError={!!errors.jenisKelamin}
                    messageError={errors.jenisKelamin}
                  />
                </section>

                <section>
                  <Label htmlFor="alamat" title="alamat" />
                  <InputText
                    value={values.alamat}
                    placeholder="alamat"
                    id="alamat"
                    name="alamat"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.alamat}
                    messageError={errors.alamat}
                  />
                </section>
                <section>
                  <Label htmlFor="noTelp" title="Nomor Telepon" />
                  <InputText
                    value={values.noTelp}
                    placeholder="Nomor Telepon"
                    id="noTelp"
                    name="noTelp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.noTelp}
                    messageError={errors.noTelp}
                  />
                </section>
                <section className="w-full">
                  <input
                    type="file"
                    id="photo"
                    onChange={(event: any) => {
                      const file = event.target.files[0];
                      console.log("file", file);
                      let reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue(`photo`, reader.result);
                      };
                      reader.readAsDataURL(file);
                      setFieldValue("file", file);
                      console.log(file);
                    }}
                  />
                </section>

                <section className="flex flex-row gap-4">
                  <Button
                    className="py-3"
                    type="submit"
                    height="md"
                    title="Simpan"
                    colorSchema="green"
                    isLoading={isLoadingCreate}
                    isDisabled={isLoadingCreate}
                  />
                </section>
              </Form>
            </FormikProvider>
          </Modal>
        </div>
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
                            router.push(`/admin/guru/${i.id_guru}/update`);
                          }}
                        >
                          detail
                        </button>
                        <button
                          className="btn btn-ghost btn-xs text-white hover:bg-white hover:text-red-500 bg-red-500"
                          onClick={() => {
                            handleDelete(i.id_guru || 0);
                          }}
                        >
                          hapus
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
