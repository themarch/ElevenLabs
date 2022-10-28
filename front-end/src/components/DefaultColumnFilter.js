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
      className='w-24'
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Chercher (${length})`}
    />
  )
}

export default DefaultColumnFilter