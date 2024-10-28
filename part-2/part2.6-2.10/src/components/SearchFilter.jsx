const SearchFilter =({searchName, onChange }) => {
    return (
   <div>
    Filter shown with:
    <input value={searchName} onChange={onChange}/>
   </div> 
   )
}

export default SearchFilter;