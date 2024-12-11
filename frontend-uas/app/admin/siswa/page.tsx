"use client";
import React from "react";
import useKelasModule from "./lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useConfirmDelete } from "@/Hook";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/Hook";
import useSiswaModule from "./lib";
import { SiswaCreatePayload, jenis_kelamin } from "./interface";
import InputText from "@/components/InputText";
import Filter from "./module/Filter";
import EmptyState from "@/components/NotFound";
import Modal from "@/components/Modal";
const SiswaPage = () => {
  const { useSiswaList, useDeleteSiswa, useCreateSiswa, optionKelas } =
    useSiswaModule();
  const { mutate: deleteMutate, isLoading: isLoadingDelete } = useDeleteSiswa();
  const { mutate: createMutate, isLoading: isLoadingCreate } = useCreateSiswa();
  const createSiswaSchema = yup.object({
    nama_siswa: yup.string().nullable().default("").required("Wajib diisi!"),
    nisn: yup.string().nullable().default("").required("Wajib diisi!"),
    jenis_kelamin: yup.string().nullable().default("").required("Wajib diisi!"),
    tempat_lahir: yup.string().nullable().default("").required("Wajib diisi!"),
    tanggal_lahir: yup.string().nullable().default("").required("Wajib diisi!"),
    alamat: yup.string().nullable().default("").required("Wajib diisi!"),
    id_kelas: yup.number().nullable().default(null).required("Wajib diisi!"),
    photo: yup.string().nullable().default("").required("Wajib isi"),
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
  } = useSiswaList();
  const router = useRouter();

  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      deleteMutate(id);
    },
  });
  const formik = useFormik<SiswaCreatePayload>({
    initialValues: {
      nama_siswa: "",
      nisn: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat: "",
      id_kelas: null,
      photo: "",
      jenis_kelamin: "",
    },
    validationSchema: createSiswaSchema,
    enableReinitialize: true,
    onSubmit: async (values: SiswaCreatePayload) => {
      console.log("sukses");
      createMutate(values);
    },
  });
  const {
    values,
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
                  <Label htmlFor="nisn" title="NISN" />
                  <InputText
                    value={values.nisn}
                    placeholder="NISN"
                    id="nisn"
                    name="nisn"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.nisn}
                    messageError={errors.nisn}
                  />
                </section>
                <section>
                  <Label htmlFor="nama_siswa" title="nama siswa" />
                  <InputText
                    value={values.nama_siswa}
                    placeholder="nama siswa"
                    id="nama_siswa"
                    name="nama_siswa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.nama_siswa}
                    messageError={errors.nama_siswa}
                  />
                </section>

                <section>
                  <Label htmlFor="jenis_kelamin" title="Jenis Kelamin" />
                  <Select
                    value={values.jenis_kelamin || 0}
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={gender}
                    isError={!!errors.jenis_kelamin}
                    messageError={errors.jenis_kelamin}
                  />
                </section>

                <section>
                  <Label htmlFor="tempat_lahir" title="Tempat Lahir" />
                  <InputText
                    value={values.tempat_lahir}
                    placeholder="Tempat Lahir"
                    id="tempat_lahir"
                    name="tempat_lahir"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.tempat_lahir}
                    messageError={errors.tempat_lahir}
                  />
                </section>
                <section>
                  <Label htmlFor="tanggal_lahir" title="Tanggal Lahir" />
                  <InputText
                    value={values.tanggal_lahir}
                    type="date"
                    placeholder="Tanggal Lahir"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!errors.tanggal_lahir}
                    messageError={errors.tanggal_lahir}
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
                  <Label htmlFor="id_kelas" title="Nama Kelas" />
                  <Select
                    value={values.id_kelas || 0}
                    id="id_kelas"
                    name="id_kelas"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={optionKelas}
                    isError={!!errors.id_kelas}
                    messageError={errors.id_kelas}
                  />
                </section>

                <section className="w-full">
                  <input
                    type="file"
                    id="photo"
                    onChange={(event: any) => {
                      const file = event.target.files[0];
                      console.log("file", file);

                      // if (file.type !== "image/jpeg/png/jpg") {
                      //   return alert("type tidak sesuai");
                      // }

                      let reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue(`photo`, reader.result);
                      };
                      reader.readAsDataURL(file);
                      setFieldValue("file", file);
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
                          router.push(`/admin/nilai/${i.id_siswa}/detail`);
                        }}
                      >
                        Lihat Nilai
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          router.push(`/admin/siswa/${i.id_siswa}/update`);
                        }}
                      >
                        detail
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-white hover:bg-white hover:text-red-600 bg-red-600"
                        onClick={() => {
                          handleDelete(i.id_siswa || 0);
                        }}
                      >
                        Hapus
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
