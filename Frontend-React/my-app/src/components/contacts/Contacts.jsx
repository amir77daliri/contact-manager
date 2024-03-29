import { useEffect } from "react";
import axios from "axios";
// My context usage :
import {useContext} from "react";
import ContactContext from "../../context/contactContext";

// Required Components :
import Contact from "./Contact";
import {CURRENTLINE, PINK, ORANGE} from "../../utils/colors";
import Spinner from "../Spinner";
// Utils && Services :
import contactService from "../../services/myAppServices";
import {Link} from "react-router-dom";


const Contacts = () => {
    const {filteredContacts : contacts, loading, deleteContact} = useContext(ContactContext)

    return (
      <>
        <section className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 float-end">
                  <Link to="/contacts/add" className="btn m-2" style={{ backgroundColor: PINK }}>
                    ساخت مخاطب جدید
                    <i className="fa fa-plus-circle mx-2" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        {loading ? <Spinner /> : (
            <section className="container">
          <div className="row">
            {/* Contact */}
            {
              contacts.length > 0 ? contacts.map(contact => (
                  <Contact key={contact.id} contact={contact} confirmDelete={() => deleteContact(contact.id) }/>
              )) : (
                  <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                    <p className="h3" style={{color: ORANGE}}>
                      مخاطب یافت نشد
                    </p>
                    <img src={require("../../assets/no-found.gif")} alt="یافت نشد" className="w-25"/>
                  </div>
              )
            }
          </div>
        </section>
        )}
      </>
    );
};

export default Contacts;
