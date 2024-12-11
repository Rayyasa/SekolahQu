"use client";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import useProdukModule from "../../lib";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLongLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import CurrencyInput from "@/components/CurrencyInput";
import useOption from "@/Hook/useOption";
import useSiswaModule from "../../lib";
import LoadingPage from "@/components/LoadingPage";
import useNilaiModule from "../../lib";
import useKelasModule from "@/app/admin/kelas/lib";
import { useConfirmDelete } from "@/Hook/useConfirmDelete";
import { NilaiUpdatePayload, semester } from "../../interface";
import EmptyState from "@/components/NotFound";

const DetailNilaiSiswa = ({ params }: { params: { id: string } }) => {
  const {
    useDetailNilai,
    useDeleteNilai,
    useUpdateNilai,
    optionsiswa,
    optionMapel,
  } = useNilaiModule();
  const { mutate: updateMutate, isLoading } = useUpdateNilai(+params.id);
  const { useKelasList } = useKelasModule();
  const { mutate } = useDeleteNilai();
  const { data, isFetching } = useDetailNilai(params.id);
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });
  const router = useRouter();
  if (isFetching) {
    return LoadingPage;
  }
  console.log(data, "data nilai");
  return (
    <section className="mx-5 py-10 flex flex-col gap-5">
      <div>
        <Link href={`/admin/kelas`}>
          {" "}
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali{" "}
          </span>{" "}
        </Link>
      </div>
      <p className="text-gray-600 text-lg">
        {" "}
        Detail Nilai - {data?.data?.[0]?.siswa?.nama_siswa}
      </p>
      <section className=" w-full ">
        <div className="rounded-lg bg-white carousel carousel-vertical overflow-y-auto w-full">
          {data?.data?.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Mata Pelajaran</th>
                  <th>Semester</th>
                  <th>Nilai Pengetahuan</th>
                  <th>Nilai Keterampilan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((i: any, e: any) => (
                  <tr key={e}>
                    <td>{i.mapel.nama_mapel}</td>
                    <td>{i.semester}</td>
                    <td>{i.nilai_pengetahuan}</td>
                    <td>{i.nilai_keterampilan}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs text-white hover:bg-white hover:text-red-600 bg-red-600"
                        onClick={() => {
                          handleDelete(i.id_nilai || 0);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </section>
  );
};

export default DetailNilaiSiswa;
