import clsx from "clsx";

interface InputProps {
  isError?: boolean;
  messageError?: string;
  id: string | number;
  name: string;
  value: string | number | undefined | null;
  width?: string;
}

const InputText: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  messageError = "wajib di isi",
  isError = false,
  id,
  name,
  value,
  width = "lg",
  ...props
}) => {
  return (
    <section>
      <input
        value={value}
        id={id}
        name={name}
        className={clsx(` h-8 border rounded px-2`, {
          "border-red-500 border-2": isError,
          "border-gray-700": !isError,
          "w-32": width === "sm",
          "w-full": width === "lg",
        })}
        {...props}
      />
      {isError ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
  );
};

export default InputText;
