import Swal from "sweetalert2";
type SubmitFunction = (id: number) => any;
export function useConfirmDelete({ onSubmit }: { onSubmit: SubmitFunction }) {
  const handleDelete = (id: number) => {
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
          await onSubmit(id);
        }
      });
  };

  return handleDelete;
}
