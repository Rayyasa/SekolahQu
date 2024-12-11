interface DetailGuruContentProps {
  data: {
    data: {
      nama_guru: string;
      nip: string;
      jenisKelamin: string;
      noTelp: string;
      alamat: string;
    };
  };
}

const DetailGuruContent = ({ data }: DetailGuruContentProps) => {
  return (
    <section className="w-full bg-white rounded-lg shadow-md overflow-hidden p-10 border">
      <h2 className="text-xl font-bold text-gray-500">
        Detail Guru - {data?.data.nama_guru}
      </h2>
      <div className="border-t border-gray-700">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
            <dt className="text-sm font-medium text-gray-500">Nama:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {data?.data.nama_guru || "Loading..."}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
            <dt className="text-sm font-medium text-gray-500">Nomor Induk Pengajar:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {data?.data.nip || "Loading..."}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
            <dt className="text-sm font-medium text-gray-500">Jenis Kelamin:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {data?.data.jenisKelamin || "Loading..."}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400">
            <dt className="text-sm font-medium text-gray-500">Nomor Telepon:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {data?.data.noTelp || "Loading..."}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Alamat:</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {data?.data.alamat || "Loading..."}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default DetailGuruContent;