"use client";
import { useFormik, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import Link from "next/link";
import useAuthModule from "../lib";

export const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
});

const ForgotPassword = () => {
  const { useForgotPass } = useAuthModule();
  const { mutate, isLoading } = useForgotPass();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors } = formik;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm  dark:border-neutral-200 w-full m-auto sm:w-1/2 h-full my-24">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-4xl sm:text-5xl font-bold text-gray-600 ">
            Lupa Password?
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-neutral-400">
            Tiba-tiba keinget passwordnya?
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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
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
                    isError={!!getIn(errors, "email")}
                  />
                </div>
                {/* End Form Group */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39] text-white hover:bg-white hover:text-gray-600  hover:outline disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting password..." : "Reset password"}
                </button>
              </div>
            </form>
          </FormikProvider>
          {/* End Form */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
