import {createContext} from "react";


const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    contact: {},
    setContact: () => {},
    contacts : [],
    setContacts: () => {},
    filteredContacts : [],
    groups: [],
    deleteContact: () => {},
    query: '',
    searchContacts : () => {},
})

export default ContactContext;