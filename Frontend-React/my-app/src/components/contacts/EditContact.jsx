import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// My context usage :
import {useContext} from "react";
import ContactContext from "../../context/contactContext";

import { Spinner } from "../";

// utils :
import { COMMENT, ORANGE, PURPLE } from "../../utils/colors";
import contactService from "../../services/myAppServices";
import formUpload from "../../utils/formUpload";
import {BaseSchema} from "../../validations/contactValidation";
// packages :
import {Formik, Field, Form, ErrorMessage} from "formik"


const EditContact = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const {loading, setLoading, contact, setContact, groups, setFilteredContacts, setContacts} = useContext(ContactContext);

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


    const submitUpdateForm = async (values) => {

        const formData = await formUpload(values)

        try {
            setLoading(true)
            const {status, data} = await contactService.updateContact(contactId, formData)
            if(status === 200) {
                // update contacts list :
                setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data}
                })
                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data}
                })
                //
                setContact({});
                navigate('/contacts');
                setLoading(false);
            }
        } catch (err)  {
            setLoading(false);
            console.log('hell: ', err);
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
                        <div className="row p-2 w-75 mx-auto align-items-center" style={{ backgroundColor: "#44475a", borderRadius: "1em" }}>
                            <div className="col-md-8">
                                <Formik
                                    initialValues={{
                                        fullname: contact.fullname,
                                        mobile: contact.mobile,
                                        email:contact.email,
                                        job: contact.job,
                                        group: contact.group?.id
                                    }}
                                    validationSchema={BaseSchema}
                                    onSubmit={(values) => {
                                        submitUpdateForm(values)
                                    }}>
                                    <Form>
                                        <div className="mb-2">
                                            <Field
                                                name="fullname"
                                                type="text"
                                                className="form-control"
                                                placeholder="نام و نام خانوادگی"
                                            />
                                            <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>} />
                                        </div>
                                        <div className="mb-2">
                                            <Field
                                                name="mobile"
                                                type="number"
                                                className="form-control"
                                                placeholder="شماره موبایل"
                                            />
                                            <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>} />
                                        </div>
                                        <div className="mb-2">
                                            <Field
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="آدرس ایمیل"
                                            />
                                            <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>} />
                                        </div>
                                        <div className="mb-2">
                                            <Field
                                                name="job"
                                                type="text"
                                                className="form-control"
                                                placeholder="شغل"
                                            />
                                            <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>} />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                name="group"
                                                className="form-control"
                                            >
                                                <option value="">انتخاب گروه</option>
                                                {groups.length > 0 &&
                                                groups.map((group) => (
                                                    <option key={group.id} value={group.id} >
                                                        {group.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>} />
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
                                    </Form>
                                </Formik>
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

                    </div>
                </section>
            </>
        )}
        </>
    );
};

export default EditContact;
