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

}

const contactService = new ContactsServices();
export default contactService;
