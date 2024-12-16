"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
// import { ProfileUpdatePayload } from "@/app/auth/interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "@/app/auth/lib";
import Image from "next/image";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import useAdminModule from "../../lib";
// import useUploadFile from "@/hook/useUploadFile";

export const registerSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")

    .required("Wajib isi"),
  avatar: yup.string().nullable().default("").required("Wajib isi"),
});

const UpdateProfile = () => {
  const { useUpdateProfile } = useAdminModule();
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { mutate, isLoading } = useUpdateProfile();

  console.log("profile", profile);
  const formik = useFormik<any>({
    initialValues: {
      nama: profile?.data.nama,
      avatar: profile?.data.avatar,
      file: undefined,
      // id: profile?.data.id,
    },
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    setFieldValue,
  } = formik;

  return (
    <>
      <section className="mx-5 py-10 flex flex-col gap-3">
        <section className="space-y-2 shadow-lg p-5">
          <Link href={"/admin/profile"}>
            <span className="flex items-center">
              {" "}
              <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
              Kembali
            </span>
          </Link>
          <h2 className="text-xl font-bold text-gray-500">
            Update Profile Akun
          </h2>
          <FormikProvider value={formik}>
            <Form className="space-y-5" onSubmit={handleSubmit}>
              <div className="">
                <Image
                  src={values.avatar || "/download.png"}
                  width={200}
                  height={200}
                  alt="image.png"
                  className="rounded-full w-[100px] h-[100px]"
                />{" "}
              </div>
              <section>
                <Label htmlFor="nama" title="Nama" />
                <InputText
                  value={values.nama}
                  placeholder="nama"
                  id="nama"
                  name="nama"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "nama")}
                  messageError={getIn(errors, "nama")}
                />
              </section>
              <section className="w-full">
                <input
                  type="file"
                  id="file"
                  onChange={(event: any) => {
                    const file = event.target.files[0];
                    console.log("file", file);

                    // if (file.type !== "image/jpeg") {
                    //   return alert("type tidak sesauai");
                    // }

                    let reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue(`avatar`, reader.result);
                    };
                    reader.readAsDataURL(file);
                    setFieldValue("file", file);
                  }}
                />
              </section>

              <section>
                <Button height="lg" title="Update" colorSchema="green" />
              </section>
            </Form>
          </FormikProvider>
        </section>
      </section>
    </>
  );
};

export default UpdateProfile;
