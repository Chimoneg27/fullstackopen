const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with a: <input 
      type="text" 
      value={value} 
      onChange={onChange} />
    </div>
  )
}

export default Filter
