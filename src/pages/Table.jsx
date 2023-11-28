import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel, //Filtro
  getSortedRowModel, //Ordenar
} from "@tanstack/react-table";
import dataMX from "../data/litte_modis_mexico";
import dataUK from "../data/modis_2022_United_Kingdom-200.json";

import classNames from "classnames";
// import { rankItem } from "@tanstack/match-sorter-utils";
import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";

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
  const [data, setData] = useState(dataUK);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    // Aquí puedes construir la URL de redirección usando los datos de la fila
    const mapUrl = `/map/${rowData.latitude}/${rowData.longitude}`;
    navigate(mapUrl);
  };

  const dataWithIds = (data) => {
    return data.map((item, index) => ({
      id: `row_${index + 1}`,
      ...item,
    }));
  };

  const columns = [
    {
      accessorKey: "latitude",
      header: () => <span className="hover:text-slate-300">Latitude</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "longitude",
      header: () => <span className="hover:text-slate-300">Longitude</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "brightness",
      header: () => <span>brightness</span>,
      cell: (info) => (
        <span className="font-bold bg-sky-500 py-1 px-2 rounded-md text-white">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "confidence",
      header: () => <span>Confianza</span>,
      cell: (info) => {
        return info.getValue() < 75 ? (
          <p className="font-bold bg-red-400 p-1 rounded-md text-white text-center">
            {info.getValue()}
          </p>
        ) : (
          <p className="font-bold bg-green-400 p-1 rounded-md text-white text-center">
            {info.getValue()}
          </p>
        );
      },
    },
    {
      accessorKey: "satellite",
      header: () => <span>satellite</span>,
      cell: (info) => <p className="font-bold">{info.getValue()}</p>,
    },
    {
      accessorKey: "bright_t31",
      header: () => <span>bright_t31</span>,
      cell: (info) => (
        <span className="font-bold bg-sky-500 py-1 px-2 rounded-md text-white">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "frp",
      header: () => <span>FRP</span>,
      cell: (info) => <p className="font-bold">{info.getValue()}</p>,
    },

    {
      accessorKey: "type",
      header: () => <span>Type</span>,
      cell: (info) => (
        <span className="font-bold bg-sky-600 py-1  px-2 rounded-md text-white">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "daynight",
      header: () => <span>Day | Night</span>,
      cell: (info) => {
        return info.getValue() === "N" ? (
          <img src={Moon} style={{ width: "20px", height: "20px" }} />
        ) : (
          <img src={Sun} style={{ width: "20px", height: "20px" }} />
        );
      },
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
        pageSize: 12, //Valor para inicializar la pagina
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
      <div className="flex justify-between">
        {/* Buscador  */}
        <div className="my-2 text-right">
          <DebounceInput
            type="text"
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="text-black border-indigo-800 px-2 py-1 rounded-md outline-indigo-600"
            placeholder="Look for..."
          />
        </div>
        <div className="hidden sm:flex">
          <button
            className="bg-[#224c73] font-semibold px-2 py-1 my-2 rounded-md hover:bg-[#4b8fcf] mr-2"
            onClick={() => setData(dataWithIds(dataMX))}
          >
            Show Mexico Data
          </button>
          <button
            className="bg-[#224c73] font-semibold px-2 py-1 my-2 rounded-md hover:bg-[#4b8fcf] mr-2"
            onClick={() => setData(dataWithIds(dataUK))}
          >
            Show UK Data
          </button>
        </div>
        {/* Texto de ubicacion */}
        <div className="hidden sm:flex text-gray-400 text-sm font-semibold ">
          Showing {getStateTable().firstIndex} to {getStateTable().lastIndex} of
          the total {getStateTable().totalRows} records
        </div>
        {/* Texto de ubicacion */}
      </div>
      {/* Buscador  */}

      {/*  <----------- Tabla --------->  */}
      <div className="overflow-auto">
        <table className="table-auto w-full min-w-[560px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="border-b border-gray-300 bg-[#224c73]"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    className="py-2 px-4 text-left uppercase hover:bg-[#4a8ecd]"
                    key={header.id}
                  >
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
              <tr
                className="text-black hover:bg-gray-200 bg-white"
                key={row.id}
              >
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
      </div>
      {/*  <----------- Tabla --------->  */}

      {/* Paginacion */}
      <div className="mt-4 md:flex items-center justify-between space-y-4">
        {/* Arrows de navegacion*/}
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-[#224c73] px-2 py-1 rounded-md hover:bg-[#4b8fcf]  disabled:hover:bg-slate-700"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-[#224c73] px-2 py-1 rounded-md hover:bg-[#4b8fcf]  disabled:hover:bg-slate-700"
          >
            {"<"}
          </button>
          {/* Numero de pagina */}
          <div>
            {table.getPageOptions().map((pageNumber, index) => (
              <button
                onClick={() => table.setPageIndex(pageNumber)}
                className={classNames({
                  "bg-[#224c73] px-2.5 py-1 rounded-md hover:bg-[#4b8fcf] hover:py-2 font-semibold disabled:hover:bg-slate-700": true,
                  "text-white px-2.5 py-2 bg-blue-500":
                    pageNumber == table.getState().pagination.pageIndex,
                })}
                key={index}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
          {/* Numero de pagina */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-[#224c73] px-2 py-1 rounded-md hover:bg-[#4b8fcf] disabled:hover:bg-slate-700"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)} // Calcular ultima pagina
            disabled={!table.getCanPreviousPage()}
            className="bg-[#224c73] px-2 py-1 rounded-md hover:bg-[#4b8fcf] disabled:hover:bg-slate-700"
          >
            {">>"}
          </button>
        </div>
        {/* Arrows de navegacion */}

        {/* Numero de paginas */}
        <select
          className="text-black border border-gray-200 rounded-lg outline-indigo-600"
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <option value="10">10 pp.</option>
          <option value="20">20 pp.</option>
          <option value="25">25 pp.</option>
          <option value="50">50 pp.</option>
        </select>
        {/* Numero de paginas */}
      </div>
      {/* Paginacion */}
    </div>
  );
}

export default Table;
