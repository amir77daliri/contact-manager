import SearchContact from "./contact/SearchContact";

import { Purple, Background } from "../utils/colors";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
        style={{backgroundColor: Background}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col mb">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge" style={{color: Purple}}/>
                            {"  "}اپلیکیشن مدیریت{" "}
                            <span style={{color: Purple}}>مخاطبین</span>
                        </div>
                    </div>
                    <div className="col">
                        <SearchContact />
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;