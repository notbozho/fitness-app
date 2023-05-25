import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import { usePocket } from '../../contexts/PocketContext'

import './exercisesList.css'

export default function ExercisesList() {
  const { getAllExercises } = usePocket()

  const [exercises, setExercises] = useState([])

  const columns = useMemo(
    () => [
      {
        Header: 'Preview',
        accessor: 'preview',
        Cell: ({ cell }) => (
          <img
            src={`http://127.0.0.1:8090/api/files/6ilgps97xsukiqm/${cell.id}/${cell.value}`}
            alt="Exercise Preview"
          />
        )
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Category',
        accessor: 'category'
      },
      {
        Header: 'Body Part',
        accessor: 'bodyPart'
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: exercises })
  useEffect(() => {
    async function getAll() {
      const ex = await getAllExercises()
      setExercises(ex)
    }

    getAll()
  }, [])

  return (
    <div className="table-container">
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
