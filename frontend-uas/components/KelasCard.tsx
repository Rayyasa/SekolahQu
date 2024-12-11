import Image from "next/image";
import { DeleteButton } from "@/components/ButtonAction";
import BgKelas from "@/assets/green-color-school-supplies-arranged-circular-shape-yellow-background.jpg";

interface KelasCardProps {
  nama_kelas: string;
  Jurusan: string;
  id_kelas: number;
  onDetail: (id: number) => void;
  onDelete?: (id: number) => void;
}

const KelasCard = ({
  nama_kelas,
  Jurusan,
  id_kelas,
  onDetail,
  onDelete,
}: KelasCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <Image src={BgKelas} alt="Kelas" />
      </figure>
      <div className="card-body flex flex-col">
        <h2 className="text-lg font-semibold">{nama_kelas}</h2>
        <p className="text-lg font-extrabold ">{Jurusan}</p>
        <div className="justify-end flex">
          <button className="" onClick={() => onDetail(id_kelas)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5"
                stroke="#2ccce4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.995 16h.009"
                stroke="#2ccce4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {onDelete && (
            <DeleteButton color="red" onClick={() => onDelete(id_kelas || 0)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default KelasCard;
