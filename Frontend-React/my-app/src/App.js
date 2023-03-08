import {useState} from "react";

import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

import './App.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className="App">
          <Navbar />
          <Contacts contacts={contacts} loading={loading}/>
        </div>
    );
}

export default App;
