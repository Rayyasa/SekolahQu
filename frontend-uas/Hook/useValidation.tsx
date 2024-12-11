import { useState } from "react";

const useValidation = () => {
  const [errorValidation, setErrorValidation] = useState<string[]>([]);
  const handleTyping = (name: string) => {
    setErrorValidation((value) => {
      const filter = value.filter(
        (item: string) => item?.includes(name) === false
      );
      return filter;
    });
  };
  const handleShowError = (name: string) => {
    const message = errorValidation.find((item: string) =>
      item?.includes(name)
    );
    return message;
  };
  return { errorValidation, handleTyping, handleShowError, setErrorValidation };
};

export default useValidation;
