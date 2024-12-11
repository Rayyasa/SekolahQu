"use client";
import React from "react";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import useAuthModule from "../auth/lib";
import { useRouter } from "next/navigation";
import useAdminModule from "./lib";
import RoleCard from "@/components/RoleCard";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useConfirmDelete } from "@/Hook/useConfirmDelete";
import { Pagination } from "@/components/Pagination";
import { UserRole } from "../auth/interface";
import Label from "@/components/Label";
import InputText from "@/components/InputText";
import Select from "@/components/Select";
import Image from "next/image";
import DashboardCard from "@/components/DashboardCard";
import Modal from "@/components/Modal";

const Page = () => {
  const { useProfile } = useAuthModule();
  const {
    useUserList,
    useDeleteUser,
    useKelasList,
    useSiswaList,
    useGuruList,
    useMapelList,
    useUser,
  } = useAdminModule();
  const { mutate, isLoading } = useDeleteUser();
  const { data: dataKelas } = useKelasList();
  const { data: dataSiswa } = useSiswaList();
  const { data: dataGuru } = useGuruList();
  const { data: dataMapel } = useMapelList();
  const { data: dataUser } = useUser();
  const {
    data,
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  } = useUserList();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();
  console.log("profile", profile);
  console.log(session);
  const router = useRouter();
  console.log(session?.user.role);
  console.log(data?.pagination?.pageSize);
  console.log(profile);
  const registerSchema = yup.object().shape({
    nama: yup.string().nullable().default("").required("Wajib isi"),
    role: yup.string().nullable().default("").required("Wajib Pilih"),
    email: yup
      .string()
      .nullable()
      .default("")
      .email("Gunakan format email")
      .required("Wajib isi"),
    password: yup
      .string()
      .nullable()
      .default("")
      .required("Wajib isi")
      .min(8, "Minimal 8 karakter"),
  });
  const { useRegister } = useAuthModule();
  const { mutate: registerMutate, isLoading: isLoadingRegister } =
    useRegister();
  const role = [
    {
      label: "Siswa",
      value: UserRole.SISWA,
    },
    {
      label: "Guru",
      value: UserRole.GURU,
    },
    {
      label: "Admin",
      value: UserRole.ADMIN,
    },
  ];
  const formik = useFormik({
    initialValues: {
      nama: "",
      email: "",
      password: "",
      role: UserRole.SISWA,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerMutate(values);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;
  return (
    <>
      <div className="px-5 py-4 space-y-5">
        <div className="max-w-[100rem]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <DashboardCard
              title="Total Users"
              count={dataUser?.data.length || 0}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
            <DashboardCard
              title="Total Guru"
              count={dataGuru?.data.length || 0}
              viewMoreLink="/admin/guru"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
            <DashboardCard
              title="Total Siswa"
              count={dataSiswa?.data.length || 0}
              viewMoreLink="/admin/siswa"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
            <DashboardCard
              title="Total Mapel"
              count={dataMapel?.data.length || 0}
              viewMoreLink="/admin/mapel"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 16.74V4.67c0-1.2-.98-2.09-2.17-1.99h-.06c-2.1.18-5.29 1.25-7.07 2.37l-.17.11c-.29.18-.77.18-1.06 0l-.25-.15C9.44 3.9 6.26 2.84 4.16 2.67 2.97 2.57 2 3.47 2 4.66v12.08c0 .96.78 1.86 1.74 1.98l.29.04c2.17.29 5.52 1.39 7.44 2.44l.04.02c.27.15.7.15.96 0 1.92-1.06 5.28-2.17 7.46-2.46l.33-.04c.96-.12 1.74-1.02 1.74-1.98ZM12 5.49v15M7.75 8.49H5.5M8.5 11.49h-3"
                    stroke="#FFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </div>
        <Modal id="my_modal_1" title="Tambah User">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <Label htmlFor="nama" title="Nama" />
                  <InputText
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama"
                    value={values.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={touched.nama && !!errors.nama}
                    messageError={errors?.nama}
                  />
                </div>
                <div>
                  <Label htmlFor="email" title="Email address" />
                  <InputText
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={touched.email && !!errors.email}
                    messageError={errors?.email}
                  />
                </div>
                <div>
                  <Label htmlFor="password" title="Password" />
                  <InputText
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={touched.password && !!errors.password}
                    messageError={errors?.password}
                  />
                </div>
                <section>
                  <Label htmlFor="role" title="Role" />
                  <Select
                    value={values.role}
                    id="role"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={role}
                    isError={!!errors.role}
                    messageError={errors.role}
                  />
                </section>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39] text-white hover:bg-white hover:text-gray-600  hover:outline disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoadingRegister}
                >
                  {isLoadingRegister ? "Tunggu sebentar ya..." : "Register"}
                </button>
              </div>
            </Form>
          </FormikProvider>
        </Modal>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <div className="rounded-lg bg-white carousel carousel-vertical overflow-y-auto p-3">
            <div className="flex flex-row justify-between p-2 border-b border-gray-500">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Users</h2>
                <p className="text-sm text-gray-600">Tambah user, Delete.</p>
              </div>
              <button
                className="btn bg-[#16ab39] text-white hover:bg-white hover:text-[#16ab39]"
                onClick={() =>
                  (document.getElementById("my_modal_1") as any)!.showModal()
                }
              >
                Tambah User
              </button>
            </div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
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
                                  src={i.avatar || "/download.png"}
                                  alt="photo profile"
                                  width={96}
                                  height={96}
                                  className=" w-[32px] h-[32px] rounded-full"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{i.nama}</div>
                            </div>
                          </div>
                        </td>
                        <td>{i.email}</td>
                        <td>{i.role}</td>
                        <th className="">
                          {/* <button className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-500 hover:text-white">
                              detail
                            </button> */}
                          <button
                            className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => {
                              handleDelete(i.id || 0);
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
          <div className="flex flex-col gap-5">
            <DashboardCard
              title="Total Kelas"
              count={dataKelas?.data.length || 0}
              viewMoreLink="/admin/kelas"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18.63 7.15c.04.61-.01 1.3-.13 2.07l-.73 4.69c-.62 3.91-2.43 5.23-6.34 4.62l-4.69-.74c-1.35-.21-2.39-.57-3.15-1.11-1.45-1.01-1.87-2.67-1.47-5.23l.74-4.69c.62-3.91 2.43-5.23 6.34-4.62l4.69.74c3.14.49 4.61 1.77 4.74 4.27Z"
                    stroke="#FFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 13.47 19 17.98c-1.25 3.76-3.25 4.76-7.01 3.51l-4.51-1.5c-2.27-.75-3.53-1.79-3.89-3.31.76.54 1.8.9 3.15 1.11l4.69.74c3.91.61 5.72-.71 6.34-4.62l.73-4.69c.12-.77.17-1.46.13-2.07 2.39 1.27 2.91 3.19 1.87 6.32ZM8.24 8.98a1.74 1.74 0 1 0 0-3.48 1.74 1.74 0 0 0 0 3.48Z"
                    stroke="#FFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
