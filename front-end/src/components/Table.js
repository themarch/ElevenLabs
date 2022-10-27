import { useMemo, useState } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { GrPrevious, GrNext } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Filter from "./Filter"
import { useDispatch, useSelector } from 'react-redux';
import { setInitial, getSlice } from '../features/dataSlice';
import DefaultColumnFilter from "./DefaultColumnFilter"
 
 function Table() { 
  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();
  const dataFilled = useSelector(getSlice)
  const data = dataFilled.updateData.astronautsData
    
  const columns = useMemo(
     () => [
       {
         Header: 'Country',
         accessor: 'country',
         disableSortBy: true,
         Cell: ({cell}) => {
          const { value } = cell;
          return (
            <p keyid="coutry" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
       },
       {
        Header: 'id',
        accessor: '_id',
        show: false
       },
       {
         Header: 'Flight Time',
         accessor: 'flightTime',
         disableFilters: true,
         Cell: ({cell}) => {
          const { value } = cell;
          return (
            <p keyid="flightTime" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
       },
       {
        Header: 'Flights ✈️',
        accessor: 'flights',
        Cell: ({cell}) => {
          const { value } = cell;
          return (
            <p className='max-w-[300px] overflow-scroll' keyid="flights" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        Cell: ({cell}) => {
          const { value } = cell;
          return (
              <p className='max-w-[90px]' keyid="gender" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({cell}) => {
          const { value } = cell;
          return (
              <p className='max-w-[140px] overflow-scroll' keyid="name" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
      },
      {
        Header: 'Total Flights',
        accessor: 'totalFlights',
        disableFilters: true,
        Cell: ({cell}) => {
          const { value } = cell;
          return (
            <p keyid="totalFlights" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
      },
      {
        Header: 'Planete',
        accessor: 'planete',
        Cell: ({cell}) => {
          const { value } = cell;
          return (
            <p keyid="planete" id={cell.row.allCells[1].value}> {value} </p>
          )
        }
      },
     ],
     []
  )

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    const value = Number(event.target.value)
    setPageSize((value <= 0 || value >= 50) ? 10 : value)
  }
  
  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  const toastNotif = (state, message) => {
    toast[state](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      });
  }

  async function updateDataTable(e) {
    const id = e.nativeEvent.target.innerHTML.split('id=')[2].split('"')[1]
    const key = e.nativeEvent.target.innerHTML.split('keyid')[1].split('"')[1]
    const newValue = e.nativeEvent.target.outerText.trim()
    const data = {
      [key]: newValue
    }
    if (key === "planete") {
      toastNotif("error", '👨‍🚀 Pourquoi changer de planète ?!')
      return
    }
    if (key === "flightTime" || key === "totalFlights") {
        if (isNaN(newValue)) {
          return
        }
    }
    if (newValue === "") {
      toastNotif("error", '👨‍🚀 Pourquoi mettre du vide')
      return
    }
    const response = await axios.put(`http://localhost:9000/astronauts/by-id/${id}`, data);
    if (response.data.status === 200) {
      dispatch(setInitial({refreshStats: true}))
      toastNotif("success", "👨‍🚀 Astronaute modifié !")
    }
    else
      toastNotif("error", '👨‍🚀 Astronaute non modifié, respecter le format !')
  }

  function tableUpdate(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
          updateDataTable(change)
      }, 1000)
    );
  }

  const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     page,
     prepareRow,
     canPreviousPage,
     canNextPage,
     pageOptions,
     gotoPage,
     setPageSize,
     state: { pageIndex, pageSize }
   } = useTable(
      { 
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: 
        { pageIndex: 0, pageSize: 10, hiddenColumns: columns.map(column => {
          if (column.show === false) return column.accessor || column.id
      }), }
      },
      useFilters,
      useSortBy,
      usePagination
      )
 
   return (
     <div className="px-4 sm:px-6 lg:px-8 pt-8">
     <div className="px-4 sm:px-6 lg:px-8 flex flex-col">
       <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
         <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
           <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-8">
           <table {...getTableProps()} className="min-w-full divide-y divide-gray-300 table-auto">
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps()}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                            <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
                          </div>
                          <Filter column={column} />
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white">
                  {page.map(row => {
                    prepareRow(row)
                    return (
                      <tr >
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              <div suppressContentEditableWarning={true} contentEditable='true' onInput={e => tableUpdate(e)} {...row.getRowProps()} className="text-gray-900 outline-none ml-2">
                                <p> 
                                {cell.render('Cell')}
                                </p>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
            </table>
           </div>
           <div className='flex mb-8 ml-2'>
                <div className='flex'>
                  <GrPrevious onClick={() => gotoPage(pageIndex - 1)} disabled={!canPreviousPage}className='cursor-pointer'/>
                    <p className='ml-6 mr-6 mt-[-3px]'> Page <input className='rounded-md w-8 text-center ml-1 mr-1' type="select" value={pageIndex + 1} onChange={onChangeInInput} /> of {pageOptions.length} </p>
                  <GrNext onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage} className='cursor-pointer'/>  
                </div>
                <div className='flex ml-12 mt-[-3px]'>
                  <input className='rounded-md w-8 text-center' type="select" value={pageSize} onChange={onChangeInSelect} />
                  <p className='ml-2'> per page </p>
                </div>
          </div>
         </div>
       </div>
     </div>
     <ToastContainer />
   </div>
   )
 }

 export default Table