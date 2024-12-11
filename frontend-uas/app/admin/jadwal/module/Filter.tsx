import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { JadwalListFilter, Hari } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import useSiswaModule from "../lib";
import useJadwalModule from "../lib";

type FilterProps = {
  params: JadwalListFilter;
  setParams: Dispatch<SetStateAction<JadwalListFilter>>;
};
const Jadwalhari = [
  {
    value: Hari.SENIN,
    label: "SENIN",
  },
  {
    value: Hari.SELASA,
    label: "SELASA",
  },
  {
    value: Hari.RABU,
    label: "RABU",
  },
  {
    value: Hari.KAMIS,
    label: "KAMIS",
  },
  {
    value: Hari.JUMAT,
    label: "JUMAT",
  },
  {
    value: Hari.SABTU,
    label: "SABTU",
  },
];

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const { optionKelas, optionMapel } = useJadwalModule();
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (
      name === "sampai_jam" &&
      params.dari_jam &&
      parseInt(value) < parseInt(params.dari_jam)
    ) {
      alert("Error Banh");
      return;
    }
    if (e.target.name === "dari_jam") {
      if (e.target.value > Number(params.sampai_jam)) {
        setParams((prevParams: JadwalListFilter) => {
          return {
            ...prevParams,
            sampai_jam: "",
          };
        });
      }
    }
    setParams((params: JadwalListFilter) => {
      return {
        ...params,
        [e.target.name]: e.target.value,  
      };
    });
  };

  return (
    <section className="space-y-2 pt-4">
      {/* <section>
        <Label htmlFor="id_mapel" title="nama mata pelajaran" />
        <Select
          value={params.id_mapel || 0}
          id="id_mapel"
          name="id_mapel"
          onChange={handleChange}
          options={optionMapel}
        />
      </section> */}
      <section>
        <Label htmlFor="id_kelas" title="Ruangan" />
        <Select
          value={params.id_kelas || 0}
          id="id_kelas"
          name="id_kelas"
          onChange={handleChange}
          options={optionKelas}
        />
      </section>
      <section>
        <Label htmlFor="hari" title="Hari" />
        <Select
          value={params.hari}
          id="hari"
          name="hari"
          onChange={handleChange}
          options={Jadwalhari}
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
