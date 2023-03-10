import {useEffect, useState} from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import contactService from "./services/myAppServices";
import {confirmAlert} from "react-confirm-alert";
import {COMMENT, CURRENTLINE, ORANGE, PURPLE, RED, YELLOW} from "./utils/colors";
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
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

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

    const deleteContact = async (contactId) => {
        try{
            setLoading(true)
            const response = await contactService.deleteContact(contactId)
            if(response) {
                const {data : contactsData} = await contactService.getAllContacts()
                setContacts(contactsData)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    // confirm alert UI :\
    const confirmDeleteAlert = (contactId) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div dir="rtl" className="p-4" style={{backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: "1em"}}>
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: ORANGE}}>آیا مطمئن هستید ؟</p>
                        <button className="btn mx-2" style={{backgroundColor: RED}} onClick={() => {
                            deleteContact(contactId)
                            onClose();
                            }}>حذف
                        </button>
                        <button className="btn" style={{backgroundColor: COMMENT}} onClick={() => {
                            onClose();
                            }}>انصراف
                        </button>
                    </div>
                )
            }
        })
    }

    const searchContacts = (event) => {
        setQuery(event.target.value)
        const MatchContacts = contacts.filter(contact => {
            return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilteredContacts(MatchContacts)
    }

    return (
        <div className="App">
            <Navbar query={query} searchContacts={searchContacts}/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts" />} />
                <Route path="/contacts" element={<Contacts contacts={filteredContacts} loading={loading} setFilteredContacts={setFilteredContacts} setContacts={setContacts} setLoading={setLoading} confirmDelete={confirmDeleteAlert}/>} />
                <Route path="/contacts/add" element={<AddContact loading={loading} groups={groups} />} />
                <Route path="/contacts/:contactId" element={<ViewContact loading={loading} setLoading={setLoading}/>} />
                <Route path="/contacts/edit/:contactId" element={<EditContact loading={loading} setLoading={setLoading} groups={groups}/>} />
            </Routes>
        </div>
    );
}

export default App;
