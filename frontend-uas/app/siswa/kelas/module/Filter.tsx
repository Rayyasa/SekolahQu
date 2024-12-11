import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import { KelasListFiler, NamaKelas, Jurusan } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";

type FilterProps = {
  params: KelasListFiler;
  setParams: Dispatch<SetStateAction<KelasListFiler>>;
};

const kelas = [
  {
    value: NamaKelas.X,
    label: "X",
  },
  {
    value: NamaKelas.XI,
    label: "XI",
  },
  {
    value: NamaKelas.XII,
    label: "XII",
  },
];

const jurusan = [
  {
    value: Jurusan.RPL,
    label: "RPL",
  },
  {
    value: Jurusan.TKJ,
    label: "TKJ",
  },
];

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setParams((prevParams: KelasListFiler) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-2 pt-4">
      <section>
        <Label title="Nama Kelas" htmlFor="nama_kelas" />
        <Select
          onChange={handleChange}
          options={kelas}
          value={params.nama_kelas}
          name="nama_kelas"
          id="nama_kelas"
        />
      </section>
      <section>
        <Label title="Jurusan" htmlFor="jurusan" />
        <Select
          onChange={handleChange}
          options={jurusan}
          value={params.Jurusan}
          name="Jurusan"
          id="Jurusan"
        />
      </section>
      <section>
        <Label title="Keyword" htmlFor="keyword" />
        <InputText
          onChange={handleChange}
          value={params.keyword}
          name="keyword"
          id="keyword"
          placeholder="Keyword"
        />
      </section>
    </section>
  );
};

export default Filter;
