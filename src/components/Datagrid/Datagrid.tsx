
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


  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


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




    const searchValue = filters['search'];
    if (searchValue) {
      const searchableColumns = displayColumns.filter((col) => col.searchable);
      filteredData = filteredData.filter((row) =>
        searchableColumns.some((col) => {
          const value = col.accessor(row);
          return value
            ? String(value).toLowerCase().includes(searchValue.toLowerCase())
            : false;
        })
      );
    }


    if (sortKey) {
      const column = displayColumns.find((col) => col.key === sortKey);
      if (column) {
        filteredData.sort((a, b) => {
          const aValue = column.accessor(a);
          const bValue = column.accessor(b);

          if (aValue == null) return 1;
          if (bValue == null) return -1;

          if (sortKey.toLowerCase().includes("date")) {
            let timeA = 0;
            let timeB = 0;


            if (
              aValue instanceof Date ||
              typeof aValue === "string" ||
              typeof aValue === "number"
            ) {
              const parsedA = new Date(aValue);
              if (!isNaN(parsedA.getTime())) timeA = parsedA.getTime();
            }

            if (
              bValue instanceof Date ||
              typeof bValue === "string" ||
              typeof bValue === "number"
            ) {
              const parsedB = new Date(bValue);
              if (!isNaN(parsedB.getTime())) timeB = parsedB.getTime();
            }

            return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
          }

          if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
          }

          return sortOrder === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        });
      }
    }



    return filteredData;
  }, [data, filters, displayColumns]);


  const handleSort = (key: string, sortable = false) => {
    if (!sortable) return;
    setCurrentPage(1);
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const totalPages = Math.ceil(data.length / pageSize);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [data, pageSize]);

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
        <div className="datagrid-filters">
          {displayColumns
            .filter((col) => col.filtered)
            .map((col) => (
              <div key={col.key} className="datagrid-filter">
                <label htmlFor={`filter-${col.key}`}>{col.label}</label>
                <select
                  id={`filter-${col.key}`}
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
        </div>

        <div>
          <input aria-label="search-table" type="text" placeholder="Search..." className="datagrid-search" onChange={(e) => {
            const value = e.target.value;
            setFilters((prev) => ({
              ...prev,
              search: value
            }));
          }} />
        </div>
      </section>
      <section className="datagrid-body">
        <table aria-label="events table">
          <thead>
            <tr>
              {displayColumns.map((col) => (
                <th aria-sort={
                  col.sortable && col.key === sortKey
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                } key={col.key} onClick={() => handleSort(col.key, col.sortable)}>
                  {col.label}{col.sortable && col.key === sortKey && <span className={`sort-indicator ${sortOrder === "asc" ? "rotate-up" : "rotate-down"
                    }`}>-</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {displayColumns.map((col) => (
                    <td key={col.key}>{col.accessor(row)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={displayColumns.length} className="text-center py-4 text-gray-500">
                  No events available
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </section>

      <section className="datagrid-footer">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>
    </main>

  )
}