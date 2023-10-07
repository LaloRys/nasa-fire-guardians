import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel, //Filtro
  getSortedRowModel, //Ordenar
} from "@tanstack/react-table";
import fakeData from "../data/200_modis_mexico.json";
import classNames from "classnames";
// import { rankItem } from "@tanstack/match-sorter-utils";

import { useNavigate } from "react-router-dom";

const DebounceInput = ({ value: keyWord, onChange, ...props }) => {
  const [value, setValue] = useState(keyWord);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // console.log("Filtro")
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

function Table() {
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    // Aquí puedes construir la URL de redirección usando los datos de la fila
    const mapUrl = `/map/${rowData.latitude}/${rowData.longitude}`;
    navigate(mapUrl);
  };

  const fakeDataWithIds = useMemo(() => {
    return fakeData.map((item, index) => ({
      id: `row_${index + 1}`,
      ...item,
    }));
  }, [fakeData]);

  useEffect(() => {
    // Actualiza los datos cuando fakeDataWithIds cambia
    setData(fakeDataWithIds);
  }, [fakeDataWithIds]);

  const [data, setData] = useState(fakeDataWithIds);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      accessorKey: "latitude",
      header: () => <span className="hover:text-slate-300">Latitude</span>,
      cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    },
    {
      accessorKey: "longitude",
      header: () => <span className="hover:text-slate-300">Longitude</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "brightness",
      header: () => <span>brightness</span>,
    },
    {
      accessorKey: "confidence",
      header: () => <span>Confidence</span>,
      cell: (info) => (
        <span className="text-cyan-400 font-semibold">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "satellite",
      header: () => <span>satellite</span>,
      cell: (info) => (
        <span className="text-cyan-400 font-semibold">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "bright_t31",
      header: () => <span>bright_t31</span>,
      cell: (info) => (
        <span className="text-cyan-400 font-semibold">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "frp",
      header: () => <span>FRP</span>,
      cell: (info) => (
        <span className="text-cyan-400 font-semibold">{info.getValue()}</span>
      ),
    },

    {
      accessorKey: "type",
      header: () => <span>FRP</span>,
      cell: (info) => (
        <span className="text-cyan-400 font-semibold">{info.getValue()}</span>
      ),
    },
  ];

  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;

    const firstIndex = pageIndex * pageSize + 1;
    const lastIndex = pageIndex * pageSize + rowsPerPage;

    return { totalRows, firstIndex, lastIndex };
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter, //Filtro
      sorting, //ordenado
    },
    initialState: {
      pagination: {
        pageSize: 15, //Valor para inicializar la pagina
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // globalFilterFn: fuzzyFilter
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="px-6 py-4">
      {/* Buscador  */}
      <div className="my-2 text-right">
        <DebounceInput
          type="text"
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="text-black border-indigo-800 px-2 py-1 rounded-md outline-indigo-600"
          placeholder="Buscar..."
        />
      </div>
      {/* Buscador  */}
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="border-b border-gray-300 bg-indigo-600"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th className="py-2 px-4 text-left uppercase" key={header.id}>
                  {header.isPlaceholder ? null : (
                    // Control Ordenado
                    <div
                      className={classNames({
                        "cursor-pointer select-none":
                          header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Manejo de estado con iconos */}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                      {/* Manejo de estado con iconos */}
                    </div>
                    // Control Ordenado
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="text-gray-200 hover:bg-gray-500" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="py-2 px-4 cursor-pointer"
                  key={cell.id}
                  onClick={() => handleRowClick(row.original)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginacion */}
      <div className="mt-4 flex items-center justify-between">
        {/* Arrows de navegacion*/}
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-500  disabled:hover:bg-slate-700"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-500  disabled:hover:bg-slate-700"
          >
            {"<"}
          </button>
          {/* Numero de pagina */}
          {table.getPageOptions().map((pageNumber, index) => (
            <button
              onClick={() => table.setPageIndex(pageNumber)}
              className={classNames({
                "bg-indigo-600 px-2.5 py-1 rounded-md hover:bg-indigo-500 font-semibold disabled:hover:bg-slate-700": true,
                "bg-indigo-100 text-black":
                  pageNumber == table.getState().pagination.pageIndex,
              })}
              key={index}
            >
              {pageNumber + 1}
            </button>
          ))}
          {/* Numero de pagina */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-500 disabled:hover:bg-slate-700"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)} // Calcular ultima pagina
            disabled={!table.getCanPreviousPage()}
            className="bg-indigo-600 px-2 py-1 rounded-md hover:bg-indigo-500  disabled:hover:bg-slate-700"
          >
            {">>"}
          </button>
        </div>
        {/* Arrows de navegacion */}
        {/* Texto de ubicacion */}
        <div className="text-gray-400 text-sm font-semibold">
          Mostrando de {getStateTable().firstIndex} al{" "}
          {getStateTable().lastIndex} del total de {getStateTable().totalRows}{" "}
          registros
        </div>
        {/* Texto de ubicacion */}
        {/* Numero de paginas */}
        <select
          className="text-black border  border-gray-200 rounded-lg outline-indigo-600"
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
        {/* Numero de paginas */}
      </div>
      {/* Paginacion */}
    </div>
  );
}

export default Table;
