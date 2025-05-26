import { useQuery } from "@apollo/client";
import { ALL_PERSONS, FIND_PERSON } from "./queries";
import "./App.css";
import { useState } from "react";
import PersonForm from "./Components/PersonForm";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null); // here we control the state of the $nameToSearch variable
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch }, // for dynamically changing values
    skip: !nameToSearch, // skip here is a boolean
  }); // line 45 to 48, the useQuery hook sets the varibles and determines the skip condition

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson} // is the nameToSearch and result.data are valid it must render the individual user
        onClose={() => setNameToSearch(null)} // the onClose function here sets the nameToSearch variable back to null
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address{" "}
            {/*When the "show address" button is clicked, nameToSearch is set to the person's name, triggering the FIND_PERSON query.*/}
          </button>
        </div>
      ))}
    </div>
  );
};

function App() {
  const result = useQuery(ALL_PERSONS); // returns an object with many fields
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading) {
    return <div>loading...</div>; // waiting for the response from the useQuery(ALL_Persons) line 15
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <>
      <h1>Apollo Client Practice</h1>

      <div>
        <Notify errorMessage={errorMessage}/>
        <Persons persons={result.data.allPersons} />
        <PersonForm setError={notify}/>
      </div>

        
    </>
  );
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};

export default App;
