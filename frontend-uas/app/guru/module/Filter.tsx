import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GuruListFilter, jenis_kelamin } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";

type FilterProps = {
  params: GuruListFilter;
  setParams: Dispatch<SetStateAction<GuruListFilter>>;
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
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setParams((prevParams: GuruListFilter) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-2 pt-4">
      <section>
        <Label title="Nama Guru" htmlFor="nama_guru" />
        <InputText
          onChange={handleChange}
          value={params.nama_guru}
          name="nama_guru"
          id="nama_guru"
          placeholder="Nama Guru"
        />
      </section>
      <section>
        <Label title="Jenis Kelamin" htmlFor="jenisKelamin" />
        <Select
          onChange={handleChange}
          options={jenisKelaminOptions}
          value={params.jenisKelamin}
          name="jenisKelamin"
          id="jenisKelamin"
        />
      </section>
      <section>
        <Label title="NIP" htmlFor="nip" />
        <InputText
          onChange={handleChange}
          value={params.nip}
          name="nip"
          id="nip"
          placeholder="NIP"
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
        <Label title="No. Telepon" htmlFor="noTelp" />
        <InputText
          onChange={handleChange}
          value={params.noTelp}
          name="noTelp"
          id="noTelp"
          placeholder="No. Telepon"
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
