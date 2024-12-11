import { ReactNode } from "react";
import { Pagination } from "./Pagination";

interface Column<T> {
  header: string;
  render: (data: T) => ReactNode;
}

interface PaginationParams {
  page: number;
  pageSize: number;
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  total_page: number;
}

interface DataTableProps<T> {
  data: {
    data: T[];
    pagination: PaginationInfo;
  };
  columns: Column<T>[];
  params: PaginationParams;
  handlePageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePage: (page: number) => void;
}


function DataTable<T>({ data, columns, params, handlePageSize, handlePage }: DataTableProps<T>) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{column.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={data?.pagination}
        />
      </tfoot>
    </table>
  );
}

export default DataTable;