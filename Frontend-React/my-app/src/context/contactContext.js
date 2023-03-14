import {createContext} from "react";


const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    contact: {},
    setContact: () => {},
    contacts : [],
    setContacts: () => {},
    filteredContacts : [],
    setFilteredContacts: () => {},
    groups: [],
    deleteContact: () => {},
    searchContacts : () => {},
})

export default ContactContext;