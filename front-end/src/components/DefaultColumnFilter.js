const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <input
      value={filterValue || ""}
      className='w-20'
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`search (${length})`}
    />
  )
}

export default DefaultColumnFilter