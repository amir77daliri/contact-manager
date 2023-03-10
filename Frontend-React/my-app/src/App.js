import {useState} from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import {
    AddContact,
    Contact,
    Contacts,
    EditContact,
    ViewContact,
    Navbar
} from "./components/index"

import './App.css';


const App = () => {
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({
        fullname: "",
        photo: "",
        mobile: "",
        email: "",
        job: "",
        group: ""
    })

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/contacts" />} />
                <Route path="/contacts" element={<Contacts contacts={contacts} loading={loading} setContacts={setContacts} setGroups={setGroups} setLoading={setLoading}/>} />
                <Route path="/contacts/add" element={<AddContact loading={loading} groups={groups} contact={contact} setContact={setContact}/>} />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
                <Route path="/contacts/edit/:contactId" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;
