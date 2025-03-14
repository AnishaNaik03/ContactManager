import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./header";
import AddContact from "./addcontact";
import ContactList from "./contactList";
import ContactDetails from "./ContactDetails";
import api from "../api/contact";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  // Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    setContacts(
      contacts.map((c) => (c.id === contact.id ? response.data : c))
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  useEffect(() => {
    const getAllContacts = async () => {  // Fixed function name
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} 
          />
          <Route 
            path="/add" 
            element={<AddContact addContactHandler={addContactHandler} />} 
          />
          <Route 
            path="/contact/:id" Component={ContactDetails} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
