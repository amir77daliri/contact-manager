import {useEffect, useState} from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import contactService from "./services/myAppServices";
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

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true)
                const {data : groupsData} = await contactService.getAllGroups()
                setGroups(groupsData);
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        fetchGroups()
    }, [])

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/contacts" />} />
                <Route path="/contacts" element={<Contacts contacts={contacts} loading={loading} setContacts={setContacts} setLoading={setLoading}/>} />
                <Route path="/contacts/add" element={<AddContact loading={loading} groups={groups} />} />
                <Route path="/contacts/:contactId" element={<ViewContact loading={loading} setLoading={setLoading}/>} />
                <Route path="/contacts/edit/:contactId" element={<EditContact loading={loading} setLoading={setLoading} groups={groups}/>} />
            </Routes>
        </div>
    );
}

export default App;
