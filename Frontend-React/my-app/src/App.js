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

// use context :
import ContactContext from "./context/contactContext";


const App = () => {
    const [contact, setContact] = useState({})
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true)

                const {data : groupsData} = await contactService.getAllGroups();
                const {data : contactsData} = await contactService.getAllContacts()

                setContacts(contactsData);
                setFilteredContacts(contactsData)
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
                setFilteredContacts(contactsData)
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
        <ContactContext.Provider value={{
            loading,
            setLoading,
            contact,
            setContact,
            contacts,
            filteredContacts,
            setFilteredContacts,
            groups,
            query,
            searchContacts,
            deleteContact: confirmDeleteAlert
        }}>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts" />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/contacts/add" element={<AddContact />} />
                    <Route path="/contacts/:contactId" element={<ViewContact />} />
                    <Route path="/contacts/edit/:contactId" element={<EditContact groups={groups}/>} />
                </Routes>
            </div>
        </ContactContext.Provider>
    );
}

export default App;
