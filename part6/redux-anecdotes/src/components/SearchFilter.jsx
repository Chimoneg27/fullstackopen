import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const SearchFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
    filter <input type="text" onChange={(e) => dispatch(filterChange(e.target.value))} name="filter"/>
   </div>
  )
}

export default SearchFilter