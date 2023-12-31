import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div style={{ height: "50px", width: "100%", marginBottom: "100" }}>
        <div className="container">
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <Link to={"/aboutus"} className="nav-link px-2 text-muted">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/careers"} className="nav-link px-2 text-muted">
                  Careers
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/faq"} className="nav-link px-2 text-muted">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/help"} className="nav-link px-2 text-muted">
                  Help
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contactus"} className="nav-link px-2 text-muted">
                  Contact Us
                </Link>
              </li>
            </ul>
            <p className="text-center text-muted">&copy; 2023 Quote Verse</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Footer;
