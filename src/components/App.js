
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Switch,Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./header";
import AddContact from "./addcontact";
import ContactList from "./contactList";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
      <Header />
      <Routes>
      <Route path="/"
       Component={()=><ContactList contacts={contacts} getContactId={removeContactHandler} />}/>

      <Route path="/add" 
      Component={()=>(
        <AddContact addContactHandler={addContactHandler}/>
  )}/>
      {/* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Routes>
      </Router>
    </div>
  );
}

export default App;