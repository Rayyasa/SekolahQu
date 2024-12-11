import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { mapelListFilter } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import useSiswaModule from "../lib";
import useMapelModule from "../lib";

type FilterProps = {
  params: mapelListFilter;
  setParams: Dispatch<SetStateAction<mapelListFilter>>;
};

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const { optionguru } = useMapelModule();
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setParams((prevParams: mapelListFilter) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-2 pt-4">
      <section>
        <Label htmlFor="nama_mapel" title="Nama MataPelajaran" />
        <InputText
          value={params.nama_mapel}
          placeholder="Mata Pelajaran"
          id="nama_mapel"
          name="nama_mapel"
          onChange={handleChange}
        />
      </section>
      <section>
        <Label htmlFor="keyword" title="keyword" />
        <InputText
          value={params.keyword}
          placeholder="keyword"
          id="keyword"
          name="keyword"
          onChange={handleChange}
        />
      </section>
      {/* <section>
        <Label htmlFor="id_guru" title="Pengajar" />
        <Select
          value={params.guru?.id_guru || 0}
          id="id_guru"
          name="id_guru"
          onChange={handleChange}
          options={optionguru}
        />
      </section> */}
    </section>
  );
};

export default Filter;
