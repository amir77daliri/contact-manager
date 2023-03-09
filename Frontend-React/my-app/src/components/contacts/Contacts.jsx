import { useEffect } from "react";
import axios from "axios";

import Contact from "./Contact";
import {CURRENTLINE, PINK, ORANGE} from "../../utils/colors";
import Spinner from "../Spinner";


const Contacts = ({contacts, loading, setContacts, setGroups, setLoading}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {data : contactsData} = await axios.get("http://localhost:8000/api/contacts");
        const {data : groupsData} = await axios.get("http://localhost:8000/api/groups");
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false)
      } catch (err) {
        setLoading(false);
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <button className="btn mx-2" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </button>
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
                <Contact key={contact.id} contact={contact}/>
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
