  "use client";
  import clsx from "clsx";

  import { Dispatch, ReactNode, SetStateAction } from "react";
  import Button from "./Button";
  import { useSpring, animated } from "@react-spring/web";

  interface DrawerProps {
    isOpen: boolean;
    children: ReactNode;
    title: string;
    onSubmit: () => void;
    onClear: () => void;
    onClose: () => void;
  }

  export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    title,
    children,
    onSubmit,
    onClear,
    onClose,
  }) => {
    const springs = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
    });

    return (
      <animated.div
        style={{
          height: "100vh",
          top: 0,
          right: 0,
          position: "absolute",
          zIndex: 50,
          ...(!isOpen && { display: "none" }),
          ...springs,
        }}
        className={
          "shadow-sm  md:w-[50%] lg:w-[30%] xl:w-[20%] w-full md bg-white border border-gray-100 px-5"
        }
      >
        <section className="h-[5%] pt-5">
          <section className="flex items-center justify-between">
            <Button
              title="Clear"
              colorSchema="blue"
              width="sm"
              onClick={() => {
                onClear();
              }}
            />
            <Button
              title="close"
              colorSchema="red"
              width="sm"
              onClick={() => {
                onClose();
              }}
            />
          </section>
          <h5 className="text-gray-600 text-lg font-bold ">{title}</h5>
        </section>
        <section className="h-[90%] py-5">{children}</section>
        <section className="absolute right-0 left-0 bottom-1 px-5 py-2">
          <Button
            onClick={() => {
              onSubmit();
              onClose();
            }}
            title="Terapkan"
            colorSchema="green"
          />
        </section>
      </animated.div>
    );
  };
