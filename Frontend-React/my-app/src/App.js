import {useEffect, useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// use context :
import ContactContext from "./context/contactContext";

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

// packages :
import _ from "lodash"
import {useImmer} from "use-immer";

// styles :
import './App.css';


const App = () => {
    const [contact, setContact] = useImmer({})
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    const [loading, setLoading] = useImmer(false);


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
            const {status} = await contactService.deleteContact(contactId)
            console.log(status)
            if(status === 204) {
                setContacts(draft => {
                    return draft.filter(c => c.id !== contactId)
                })
                setFilteredContacts(draft => {
                    return draft.filter(c => c.id !== contactId)
                })
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
            alert("مجددا امتحان کنید!")
        }
    }

    // confirm alert UI :
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

    const searchContacts = _.debounce((searchValue) => {
        if(!searchValue) return setFilteredContacts(contacts)
        setFilteredContacts(draft => {
            // if we use draft here we have a problem in contacts search
            return contacts.filter(c => c.fullname.toLowerCase().includes(searchValue.toLowerCase()))
        })
    }, 1000);

    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            contact,
            setContact,
            contacts,
            setContacts,
            filteredContacts,
            setFilteredContacts,
            groups,
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
                    <Route path="/contacts/edit/:contactId" element={<EditContact />} />
                </Routes>
            </div>
        </ContactContext.Provider>
    );
}

export default App;
