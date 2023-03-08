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
    const [loading, setLoading] = useState(false);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/contacts" />} />
                <Route path="/contacts" element={<Contacts contacts={contacts} loading={loading} />} />
                <Route path="/contacts/add" element={<AddContact />} />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
                <Route path="/contacts/edit/:contactId" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;
