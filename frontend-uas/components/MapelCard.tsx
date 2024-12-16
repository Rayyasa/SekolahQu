// components/MapelCard.tsx
import Image from "next/image";
import { EditButton, DeleteButton } from "@/components/ButtonAction";
import { useRouter } from "next/navigation";
import BgMapel from "@/assets/green-desk-with-stationery-top-view-copypace.jpg";

interface MapelCardProps {
  id_mapel: number;
  nama_mapel: string;
  guru: {
    nama_guru: string;
  };
  showActions?: boolean;
  onDelete?: (id: number) => void;
}

const MapelCard = ({ id_mapel, nama_mapel, guru, showActions = true, onDelete }: MapelCardProps) => {
  const router = useRouter();

  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <Image src={BgMapel} alt="Mapel" />
      </figure>
      <div className="card-body flex flex-col">
        <h2 className="text-lg font-semibold">{nama_mapel}</h2>
        <p className="text-lg font-extrabold">
          Nama Pengajar : {guru.nama_guru}
        </p>
        {showActions && (
          <div className="justify-end flex">
            <EditButton
              color="blue"
              onClick={() => {
                router.push(`/admin/mapel/${id_mapel}/update`);
              }}
            />
            <DeleteButton
              color="red"
              onClick={() => {
                onDelete && onDelete(id_mapel);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapelCard;