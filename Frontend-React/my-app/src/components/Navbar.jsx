import SearchContact from "./contacts/SearchContact";

import { PURPLE, BACKGROUND } from "../utils/colors";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
        style={{backgroundColor: BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col mb">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge" style={{color: PURPLE}}/>
                            {"  "}اپلیکیشن مدیریت{" "}
                            <span style={{color: PURPLE}}>مخاطبین</span>
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