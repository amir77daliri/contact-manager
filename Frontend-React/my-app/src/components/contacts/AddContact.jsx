import {useState} from "react";
import {useNavigate} from "react-router-dom";
// My context usage :
import {useContext} from "react";
import ContactContext from "../../context/contactContext";

import { Link } from "react-router-dom";
import {Spinner} from "../index";
import { COMMENT, GREEN, PURPLE } from "../../utils/colors";

import contactService from "../../services/myAppServices";
import formUpload from "../../utils/formUpload"
import {creatContactSchema} from "../../validations/contactValidation";
// packages :
import {useFormik} from "formik"


const AddContact = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const {filteredContacts, setFilteredContacts, loading, setLoading, groups} = useContext(ContactContext)
    const formik = useFormik({
        initialValues: {
            fullname: '',
            mobile: '',
            email: '',
            job: '',
            group: '',
            photo: ''
        },
        validationSchema: creatContactSchema,
        onSubmit: values => {
            createContactForm(values)
        },
    })

    const handleImageUpload = (e) => {
      if(e.target.files) {
        let file = e.target.files[0]
        setImage(file)
      }
    }

    const createContactForm = async (values) => {

        const formData = formUpload(values, image)
        try {
            setLoading(true)
            const {data, status} = await contactService.createNewContact(formData)

            if(status === 201) {
                const allContacts = [...filteredContacts, data]
                setFilteredContacts(allContacts)
                setImage(null)
                setLoading(false)
                navigate('/contacts')
            }
        } catch (err)  {
            setLoading(false)
            console.log('hell', err);
            navigate('/contacts');
        }
    }

    return (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <section className="p-3">
                <img
                  src={require("../../assets/man-taking-note.png")}
                  height="400px"
                  alt="hello man"
                  style={{
                    position: "absolute",
                    zIndex: "-1",
                    top: "130px",
                    left: "100px",
                    opacity: "50%",
                  }}
                />
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p
                        className="h4 fw-bold text-center"
                        style={{ color: GREEN }}
                      >
                        ساخت مخاطب جدید
                      </p>
                    </div>
                  </div>
                  <hr style={{ backgroundColor: GREEN }} />
                  <div className="row mt-5">
                    <div className="col-md-4">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="mb-2">
                          <input
                              id="fullname"
                              name="fullname"
                              type="text"
                              className="form-control"
                              placeholder="نام و نام خانوادگی"
                              {...formik.getFieldProps('fullname')}
                          />
                            {formik.touched.fullname && formik.errors.fullname ? (<div className="text-danger">{formik.errors.fullname}</div>) : null}
                        </div>
                        <div className="mb-2">
                          <input
                              id="mobile"
                              name="mobile"
                              type="number"
                              className="form-control"
                              placeholder="شماره موبایل"
                              {...formik.getFieldProps('mobile')}
                          />
                            {formik.touched.mobile && formik.errors.mobile ? (<div className="text-danger">{formik.errors.mobile}</div>) : null}
                        </div>
                        <div className="mb-2">
                          <input
                              id="email"
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="آدرس ایمیل"
                              {...formik.getFieldProps('email')}
                          />
                            {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null}
                        </div>
                        <div className="mb-2">
                          <input
                              id="job"
                              type="text"
                              name="job"
                              className="form-control"
                              placeholder="شغل"
                              {...formik.getFieldProps('job')}
                          />
                            {formik.touched.job && formik.errors.job ? (<div className="text-danger">{formik.errors.job}</div>) : null}
                        </div>
                        <div className="mb-2">
                          <select
                              id="group"
                              name="group"
                              className="form-control"
                              {...formik.getFieldProps('group')}
                              >
                          <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </select>
                            {formik.touched.group && formik.errors.group ? (<div className="text-danger">{formik.errors.group}</div>) : null}
                        </div>
                        <div className="mb-2">
                          <input
                              id="photo"
                              name="photo"
                              type="file"
                              className="form-control"
                              onChange={(e) => {
                                  handleImageUpload(e);
                                  formik.handleChange(e)
                              }}
                              onBlur={formik.handleBlur}
                          />
                          <label id="fileLabel" htmlFor="photo" className="form-control">
                            انتخاب تصویر مخاطب
                          </label>
                            {formik.touched.photo && formik.errors.photo ? (<div className="text-danger">{formik.errors.photo}</div>) : null}
                        </div>
                        <div className="mx-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: PURPLE }}
                            value="ساخت مخاطب"
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
                  </div>
                </div>
              </section>
            </>
          )}
        </>
    );
};

export default AddContact;
