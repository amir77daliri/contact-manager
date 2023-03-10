import { Link } from "react-router-dom";
import {Spinner} from "../index";
import { COMMENT, GREEN, PURPLE } from "../../utils/colors";



const AddContact = ({loading, groups, contact, setContact}) => {

  const setContactInfo = (event) => {
    setContact({
      ...contact, [event.target.name] : event.target.value
    })
  }

  const createContactForm = (e) => {
    e.preventDefault();
    console.log(contact)
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
                  <form onSubmit={createContactForm}>
                    <div className="mb-2">
                      <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          value={contact.fullname}
                          onChange={setContactInfo}
                          onBlur=""
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                          onChange={setContactInfo}
                          id="mobile"
                          name="mobile"
                          type="number"
                          value={contact.mobile}
                          className="form-control"
                          placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                          onChange={setContactInfo}
                          id="email"
                          type="email"
                          name="email"
                          value={contact.email}
                          className="form-control"
                          placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                          onChange={setContactInfo}
                          id="job"
                          type="text"
                          name="job"
                          value={contact.job}
                          className="form-control"
                          placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                          onChange={setContactInfo}
                          id="group"
                          name="group"
                          value={contact.group}
                          className="form-control"
                          >
                      <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                          id="photo"
                          name="photo"
                          type="file"
                          className="form-control"
                          onChange={(e) => {
                            console.log(e.target.files)

                          }}
                      />
                      <label id="fileLabel" htmlFor="photo" className="form-control" style={{color: "green !important"}}>
                        انتخاب تصویر مخاطب
                      </label>
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
