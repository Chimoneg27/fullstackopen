const Note = ({ name, number, onChangeName, onChangeNumber, onClick }) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={onChangeName} />
      </div>

      <div>
        number: <input value={number} onChange={onChangeNumber} />
      </div>

      <div>
        <button type="submit" onClick={onClick}>
          add
        </button>
      </div>
    </form>
  )
}

export default Note
