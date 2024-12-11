"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import LoadingPage from "@/components/LoadingPage";
import useGuruModule from "../../lib";
import DetailGuruContent from "@/components/DetailGuru";

const DetailGuru = ({ params }: { params: { id: string } }) => {
  const { useDetailGuru } = useGuruModule();
  const { data, isFetching } = useDetailGuru(params.id);
  const router = useRouter();

  if (isFetching) {
    return LoadingPage;
  }

  return (
    <section className="mx-5 py-10 flex flex-col gap-3">
      <div>
        <Link href={"/guru"}>
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
      </div>
      <DetailGuruContent data={data} />
    </section>
  );
};

export default DetailGuru;
