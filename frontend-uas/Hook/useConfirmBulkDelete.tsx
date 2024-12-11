"use client";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
type SubmitFunction = (payload: number[]) => any;

type Data = {
  data: {
    id: number;
  }[];
};

export function useConfirmDeleteBulk({
  onSubmit,
  data,
}: {
  onSubmit: SubmitFunction;
  data: Data | undefined;
}) {
  const [deletePayload, setDeletePayload] = useState<number[]>([]);

  const checked = useMemo(() => {
    if (!data) {
      return { isAllCheced: false };
    }
    const isAllChecked = data.data.every((n) => deletePayload.includes(n.id));

    return { isAllCheced: isAllChecked };
  }, [deletePayload, data]);

  const handleDeleteBulk = (payload: number[]) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Apakah Yakin?",
        text: "Data yang terhapus tidak bisa dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "red",

        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await onSubmit(payload);
        }
      });
  };

  return {handleDeleteBulk, deletePayload, setDeletePayload, checked}
}