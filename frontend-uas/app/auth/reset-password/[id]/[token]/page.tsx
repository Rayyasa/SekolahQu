"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import {
  LoginPayload,
  ForgotPassPayload,
  ResetPasswordPayload,
} from "../../../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../../../lib";
import Link from "next/link";

export const ResetPwSchema = yup.object().shape({
  new_password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const LupaPw = ({ params }: { params: { id: string; token: string } }) => {
  const { id, token } = params;

  const { useResetPassword } = useAuthModule();
  const { mutate, isLoading } = useResetPassword(id, token);
  const formik = useFormik<ResetPasswordPayload>({
    initialValues: ResetPwSchema.getDefault(),
    validationSchema: ResetPwSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm  dark:border-neutral-200 w-full m-auto sm:w-1/2 h-full my-24">
      <div className="p-5 sm:p-7">
        <div className="text-center">
          <h1 className="block text-4xl sm:text-5xl font-bold text-gray-600 ">
            Reset Password
          </h1>
        </div>
        <div className="mt-5">
          {/* Form */}
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <Label htmlFor="new_password" title="password baru" />
                  <InputText
                    type="new_password"
                    id="new_password"
                    name="new_password"
                    placeholder="Masukkan Password Barumu"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={!!getIn(errors, "new_password")}
                  />
                </div>
                {/* End Form Group */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39] text-white hover:bg-white hover:text-gray-600  hover:outline disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Lagi proses password baru kamu..."
                    : "Reset Password"}
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

export default LupaPw;
