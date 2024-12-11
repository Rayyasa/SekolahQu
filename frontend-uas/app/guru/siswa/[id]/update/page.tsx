"use client";
import DetailSiswaView from "@/components/DetailSiswa";
import useSiswaModule from "../../lib";
import LoadingPage from "@/components/LoadingPage";

const DetailSiswa = ({ params }: { params: { id: string } }) => {
  const { useDetailSiswa } = useSiswaModule();
  const { data, isFetching } = useDetailSiswa(params.id);

  if (isFetching) {
    return LoadingPage;
  }

  return <DetailSiswaView data={data} />;
};

export default DetailSiswa;
