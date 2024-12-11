import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SiswaListFilter, jenis_kelamin } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import useSiswaModule from "../lib";

type FilterProps = {
  params: SiswaListFilter;
  setParams: Dispatch<SetStateAction<SiswaListFilter>>;
};

const jenisKelaminOptions = [
  {
    value: jenis_kelamin.L,
    label: "Laki-Laki",
  },
  {
    value: jenis_kelamin.P,
    label: "Perempuan",
  },
];

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const { optionKelas } = useSiswaModule();
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setParams((prevParams: SiswaListFilter) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-2 pt-4">
      <section>
        <Label title="Nama Siswa" htmlFor="nama_siswa" />
        <InputText
          onChange={handleChange}
          value={params.nama_siswa}
          name="nama_siswa"
          id="nama_siswa"
          placeholder="Nama Siswa"
        />
      </section>
      <section>
        <Label title="Jenis Kelamin" htmlFor="jenis_kelamin" />
        <Select
          onChange={handleChange}
          options={jenisKelaminOptions}
          value={params.jenis_kelamin}
          name="jenis_kelamin"
          id="jenis_kelamin"
        />
      </section>
      <section>
        <Label title="NISN" htmlFor="NISN" />
        <InputText
          onChange={handleChange}
          value={params.nisn}
          name="nisn"
          id="nisn"
          placeholder="NISN"
        />
      </section>
      <section>
        <Label title="Tanggal Lahir" htmlFor="tanggal_lahir" />
        <InputText
          onChange={handleChange}
          value={params.tanggal_lahir}
          name="tanggal_lahir"
          id="tanggal_lahir"
          placeholder="Tanggal Lahir"
          type="date"
        />
      </section>
      <section>
        <Label title="Tempat Lahir" htmlFor="tempat_lahir" />
        <InputText
          onChange={handleChange}
          value={params.tempat_lahir}
          name="tempat_lahir"
          id="tempat_lahir"
          placeholder="Tempat lahir"
        />
      </section>
      <section>
        <Label title="Alamat" htmlFor="alamat" />
        <InputText
          onChange={handleChange}
          value={params.alamat}
          name="alamat"
          id="alamat"
          placeholder="Alamat"
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
