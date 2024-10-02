const Note = ({ name, number, onChange, onClick }) => {
  <form>
    <div>
      name: <input value={name} onChange={onChange} />
    </div>

    <div>
      number: <input value={number} onChange={onChange} />
    </div>

    <div>
      <button type="submit" onClick={onClick}>
        add
      </button>
    </div>
  </form>
}

export default Note
