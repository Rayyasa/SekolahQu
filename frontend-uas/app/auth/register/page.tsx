"use client";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import Link from "next/link";
import useAuthModule from "../lib";
import { UserRole } from "../interface";
import Select from "@/components/Select";

export const registerSchema = yup.object().shape({
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

const Register = () => {
  const { useRegister } = useAuthModule();
  const { mutate, isLoading } = useRegister();
  const role = [
    {
      label: "Siswa",
      value: UserRole.SISWA,
    },
    {
      label: "Guru",
      value: UserRole.GURU,
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
      mutate(values);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm  dark:border-neutral-200 w-full m-auto sm:w-1/2 h-full my-24">
      <div className="p-5 sm:p-7">
        <div className="text-center">
          <h1 className="block text-4xl sm:text-5xl font-bold text-gray-700 ">
            Register
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-neutral-400">
            Sudah Punya Akun?
            <a
              className="text-[#16ab39] decoration-2 hover:underline font-medium "
              href="/auth/login"
            >
              Login kesini👈
            </a>
          </p>
        </div>
        <div className="mt-5">
          {/* Form */}
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <Label htmlFor="nama" title="Nama" />
                  <InputText
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukkan namamu"
                    value={values.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={touched.nama && !!errors.nama}
                    messageError={errors?.nama}
                  />
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <Label htmlFor="email" title="Email address" />
                  <InputText
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan Emailmu"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={touched.email && !!errors.email}
                    messageError={errors?.email}
                  />
                </div>
                {/* End Form Group */}
                {/* Form Group */}
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
                {/* End Checkbox */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39] text-white hover:bg-white hover:text-gray-600  hover:outline disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? "Tunggu sebentar ya..." : "Register"}
                </button>
              </div>
            </Form>
          </FormikProvider>
          {/* End Form */}
        </div>
      </div>
    </div>
  );
};

export default Register;
