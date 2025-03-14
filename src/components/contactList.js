import React from "react";
import {Link} from "react-router-dom";
import ContactCard from "./contactCard";

const ContactList=(props)=>{

    console.log(props);
    const deleteContactHandler=(id)=>{
        props.getContactId(id);
    };
    
    const renderContactList=props.contacts.map((contact)=>{
        return (
        <ContactCard 
        contact={contact} 
        clickHander={deleteContactHandler} 
        key={contact.id}
        />
        );

    });
    return(
        <div class="main">
            <h2>
                CONTACT list
                <Link to="/add">
                <button className="ui button blue right">add contact</button>
                </Link>
            </h2>
         
        
        <div className="uni celled list">
            {renderContactList}
        </div>
        </div>
    );
};

export default ContactList;