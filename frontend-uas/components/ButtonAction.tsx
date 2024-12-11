import clsx from "clsx";
import { TrashIcon, PencilSquareIcon,PlusCircleIcon } from "@heroicons/react/20/solid";
import Spinner from "./Spinner";
interface ButtonActionProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const DeleteButton: React.FC<
  ButtonActionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, isLoading = false, ...props }) => {
  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={onClick}
      {...props}
      className="text-red-500  h-6 w-6 "
    >
      {isLoading ? <Spinner /> : <TrashIcon />}
    </button>
  );
};

export const EditButton: React.FC<
  ButtonActionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, isLoading = false, ...props }) => {
  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={onClick}
      {...props}
      className="text-blue-500 h-6 w-6"
    >
      {isLoading ? <Spinner /> : <PencilSquareIcon />}
    </button>
  );
};
export const AddButton: React.FC<
  ButtonActionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, isLoading = false, ...props }) => {
  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={onClick}
      {...props}
      className="text-blue-500 h-6 w-6"
    >
      {isLoading ? <Spinner /> : < PlusCircleIcon/>}
    </button>
  );
};
