import axios from "axios";

const SERVER_URL = "http://localhost:8000/api";

class ContactsServices {

    getAllContacts = () => {
        const url = `${SERVER_URL}/contacts`
        return axios.get(url)
    }

    getAllGroups = () => {
        const url = `${SERVER_URL}/groups`
        return axios.get(url)
    }

    createNewContact = (formData) => {
        const url = `${SERVER_URL}/add-contact/`
        return axios.post(url, formData)
    }

    getContact = (contactId) => {
        const url = `${SERVER_URL}/contact/${contactId}`
        return axios.get(url)
    }

    updateContact = (contactId, formData) => {
        const url = `${SERVER_URL}/contact/${contactId}/`
        return axios.patch(url, formData)
    }

    deleteContact = (contactId) => {
        const url = `${SERVER_URL}/contact/${contactId}/`
        return axios.delete(url)
    }

}

const contactService = new ContactsServices();
export default contactService;
