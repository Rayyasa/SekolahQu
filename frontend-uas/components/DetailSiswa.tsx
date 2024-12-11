import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface DetailSiswaViewProps {
  data: {
    data: {
      id_siswa: string;
      nama_siswa: string;
      nisn: string;
      jenis_kelamin: string;
      tempat_lahir: string;
      tanggal_lahir: string;
      alamat: string;
      kelas: {
        nama_kelas: string;
        Jurusan: string;
      };
    };
  };
  role?: 'guru' | 'siswa';
}

const DetailSiswaView = ({ data, role}: DetailSiswaViewProps) => {
  const router = useRouter();
  
  return (
    <section className="mx-5 py-4 flex flex-col gap-3">
      <div>
        <Link href={role === 'guru' ? '/guru/siswa' : '/siswa'}>
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
      </div>
      <section className=" w-full bg-white rounded-lg shadow-md overflow-hidden p-10 border">
        <h2 className="text-base sm:text-xl font-bold text-gray-500">
          Detail Siswa - {data?.data.nama_siswa}
        </h2>{" "}
        <div className="border-t border-gray-700">
          <dl>
            <div className="bg-gray-50  py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
              <dt className="text-sm font-medium text-gray-500 ">Nama:</dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.nama_siswa || "Loading..."}
              </dd>
            </div>
            <div className="bg-white   py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
              <dt className="text-sm font-medium text-gray-500">
                Nomor Induk Siswa:
              </dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.nisn || "Loading..."}
              </dd>
            </div>
            <div className="bg-gray-50  py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
              <dt className="text-sm font-medium text-gray-500 ">
                Jenis Kelamin:
              </dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.jenis_kelamin || "Loading..."}
              </dd>
            </div>
            <div className="bg-white   py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
              <dt className="text-sm font-medium text-gray-500 ">
                Tempat Lahir:
              </dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.tempat_lahir || "Loading..."}
              </dd>
            </div>
            <div className="bg-white   py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
              <dt className="text-sm font-medium text-gray-500 ">
                Tanggal Lahir:
              </dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.tanggal_lahir || "Loading..."}
              </dd>
            </div>
            <div className="bg-white   py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
              <dt className="text-sm font-medium text-gray-500 ">Alamat:</dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.alamat || "Loading..."}
              </dd>
            </div>
            <div className="bg-white   py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 0">
              <dt className="text-sm font-medium text-gray-500 ">Kelas</dt>
              <dd className="mt-1 text-sm  text-black sm:mt-0 sm:col-span-2">
                {data?.data.kelas.nama_kelas} -{" "}
                {data?.data.kelas.Jurusan || "Loading..."}
              </dd>
            </div>
            <button
              className="btn bg-[#16ab39] text-white hover:bg-white hover:text-[#16ab39]"
              onClick={() => {
                router.push(`/guru/nilai/${data?.data.id_siswa}/detail`);
              }}
            >
              Lihat Nilai
            </button>
          </dl>
        </div>
      </section>
    </section>
  );
};

export default DetailSiswaView;