import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../utils/colors";

import contactService from "../../services/myAppServices";
import formUpload from "../../utils/formUpload";

const EditContact = ({loading, setLoading, groups}) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true)
        const {data : contactData} = await contactService.getContact(contactId)
        setContact(contactData)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }
    fetchContact();
  }, [])

  const setContactInfo = (event) => {
    setContact({...contact, [event.target.name]: event.target.value})
  };


  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault()
    const formData = formUpload(contact)
    try {
      setLoading(true)
      const response = await contactService.updateContact(contactId, formData)
      console.log(response)
      if(response.status === 200) {
        setContact({})
        navigate('/contacts')
        setLoading(false)
      }
    } catch (err)  {
      setLoading(false)
      console.log('hell', err)
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form onSubmit={handleUpdateFormSubmit} >
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        value={contact.fullname}
                        onChange={setContactInfo}
                        required={true}
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        className="form-control"
                        value={contact.mobile}
                        onChange={setContactInfo}
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={contact.email}
                        onChange={setContactInfo}
                        required={true}
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        value={contact.job}
                        onChange={setContactInfo}
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={setContactInfo}
                        required={true}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id} selected>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                alt={contact.fullname}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
