import React from "react";
import clsx from "clsx";
import CurrencyInputField from "react-currency-input-field";

interface CurrencyInputProps {
  isError?: boolean;
  messageError?: string;
  id: string;
  name: string;
  value: number;
  placeholder?: string;
  decimalsLimit: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  width?: string;
  prefix?: string;
  onValueChange: (value: number) => void;
  style?: React.CSSProperties;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  messageError = "wajib di isi",
  isError = false,
  id,
  name,
  value,
  width = "lg",
  prefix = "Rp",
  placeholder,
  decimalsLimit,
  decimalSeparator,
  groupSeparator,
  onValueChange,
  style,
  className,
  ...props
}) => {
  const handleChange = (value: string | undefined) => {
    onValueChange(parseFloat(value || "0"));
  };

  return (
    <section>
      <CurrencyInputField
        id={id}
        name={name}
        value={value}
        prefix={prefix}
        placeholder={placeholder}
        allowNegativeValue={false}
        decimalsLimit={decimalsLimit}
        onValueChange={handleChange}
        className={clsx(
          className,
          "pl-3 py-2 w-full text-sm rounded border-2 focus:outline-none focus:ring-2",
          {
            "hover:ring-red-500 focus:ring-red-500 border-red-500": isError,
            "hover:ring-blue-500 focus:ring-red-500 border-black": !isError,
          }
        )}
        style={{
          height: 30,
          margin: 0,
          ...style,
        }}
        {...props}
      />
      {isError && <p className="text-red-500 font-bold">{messageError}</p>}
    </section>
  );
};

export default CurrencyInput;
