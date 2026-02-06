
'use client'
import { DataGridProps } from "./Datagrid.types";
import './Datagrid.css'
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "./Pagination";

export const Datagrid = <T,>(
  props: DataGridProps<T>
) => {
  const { data, columns, pageSize = 10 } = props;
  const displayColumns = columns.filter((item) => !item.hidden)
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});



  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {};

    displayColumns
      .filter((col) => col.filtered)
      .forEach((col) => {
        const values = new Set<string>();

        data.forEach((row) => {
          const value = col.accessor(row);
          if (value !== undefined && value !== null) {
            values.add(String(value));
          }
        });

        options[col.key] = Array.from(values);
      });

    return options;
  }, [data, displayColumns]);




const displayData = useMemo(() => {
    let filteredData = [...data];

    Object.keys(filters).forEach((key) => {
        const filterValue = filters[key];
        if (filterValue) {
            filteredData = filteredData.filter((row) => {
                const column = displayColumns.find((col) => col.key === key);
                if (!column) return true;

                const value = column.accessor(row);
                return String(value) === filterValue;
            });
        }
    });

    return filteredData;
}, [data, filters, displayColumns]);

  const totalPages = Math.ceil(displayData.length / pageSize);
  const paginated = displayData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /*  useEffect(() => {
       setCurrentPage(1);
   } , [data, pageSize]) */


  return (

    <main className="datagrid-container">

      <section className="datagrid-header">
        {displayColumns
          .filter((col) => col.filtered)
          .map((col) => (
            <div key={col.key} className="datagrid-filter">
              <label>{col.label}</label>
              <select
                value={filters[col.key] ?? ''}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [col.key]: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
              >
                <option value="">All</option>
                {filterOptions[col.key]?.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
      </section>
      <section className="datagrid-body">
        <table>
          <thead>
            <tr>
              {displayColumns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {displayColumns.map((col) => (
                  <td key={col.key}>{col.accessor(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </section>

      <section className="datagrid-footer">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>
    </main>

  )
}