import React from "react";
import { useField, useFormikContext } from "formik";
import InputText from "@/components/InputText";
import Label from "@/components/Label";

interface TimeRangeInputProps {
  label: string;
  name: string;
  isError: boolean;
  messageError: string | boolean | undefined;
}

const TimeRangeInput: React.FC<TimeRangeInputProps> = ({
  label,
  name,
  isError,
  messageError,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const times = field.value ? field.value.split(" - ") : ["", ""];
    times[index] = e.target.value;
    setFieldValue(name, times.join(" - "));
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={name} title={label} />
      <div className="flex gap-2">
        <InputText
          id={`${name}-start`}
          name={`${name}-start`}
          type="time"
          value={field.value ? field.value.split(" - ")[0] : ""}
          onChange={(e) => handleTimeChange(e, 0)}
          isError={isError}
        />
        <span className="self-center">-</span>
        <InputText
          id={`${name}-end`}
          name={`${name}-end`}
          type="time"
          value={field.value ? field.value.split(" - ")[1] : ""}
          onChange={(e) => handleTimeChange(e, 1)}
          isError={isError}
        />
      </div>
      {isError && <p className="text-red-500 text-xs mt-1">{messageError}</p>}
    </div>
  );
};

export default TimeRangeInput;
