"use client";
import { useFormik, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleButton from "react-google-button";
import useAuthModule from "../lib";
import InputText from "@/components/InputText"; // Komponen InputText yang sudah ada
import Label from "@/components/Label";

export const registerSchema = yup.object().shape({
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

const Login = () => {
  const { data: session } = useSession();
  const { useLogin } = useAuthModule();
  const { mutate, isLoading } = useLogin();
  const router = useRouter();

  const formik = useFormik({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const { handleSubmit, values, errors, touched } = formik;

  useEffect(() => {
    if (session) {
      const role = session.user.role;
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "siswa") {
        router.push("/siswa");
      } else if (role === "guru") {
        router.push("/guru");
      }
    }
  }, [session, router]);

  return (
    <>
      <div className=" bg-white border border-gray-200 rounded-xl shadow-sm w-full m-auto sm:w-1/2 h-full my-24">
        <div className="p-5 sm:p-10">
          <div className="text-center">
            <h1 className="block text-4xl sm:text-5xl font-bold text-gray-700 ">
              Sign in
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-neutral-400">
              Silahkan Login dengan akun yang sudah diberikan oleh Admin 😊
            </p>
            {/* <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-neutral-400">
              Kamu Belum Punya Akun?
              <a
                className="text-[#16ab39] decoration-2 hover:underline font-medium"
                href="/auth/register"
              >
                Bikin dulu disini👈
              </a>
            </p> */}
          </div>
          <div className="mt-5">
            <FormikProvider value={formik}>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Email Input */}
                  <section>
                    <Label htmlFor="email" title="email" />
                    <InputText
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Masukkan Emailmu"
                      value={values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isError={touched.email && !!errors.email}
                    />
                  </section>
                  <section>
                    <div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password" title="Password" />
                        <a
                          className="text-sm text-[#16ab39] decoration-2 hover:underline font-medium"
                          href="/auth/lupa-password"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <InputText
                          type="password"
                          id="password"
                          name="password"
                          placeholder="*******"
                          value={values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isError={touched.password && !!errors.password}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <svg
                            className="size-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="password-error"
                      >
                        8+ characters required
                      </p>
                    </div>
                  </section>
                  {/* Password Input */}
                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#16ab39] text-white hover:bg-white hover:text-gray-600  hover:outline disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isLoading}
                  >
                    {isLoading ? "Tunggu Sebentar ya..." : "Sign in"}
                  </button>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
