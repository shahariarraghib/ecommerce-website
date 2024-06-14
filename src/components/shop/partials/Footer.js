import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {
  return (
    // <Fragment>
    //   <footer
    //     style={{ background: "#303031", color: "#87898A" }}
    //     classNameName="z-10 py-6 px-4 md:px-12 text-center"
    //   >
    //     Develop & Design Hasan-py © Copyright {moment().format("YYYY")}
    //   </footer>
    // </Fragment>
    <>
      <div className="bg-orange-100">
        <footer>
          <div className="p-8">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4">
                <h5 className="mb-3 text-orange-700">E-COMMERCE</h5>
                <p>
                  This is an e-commerce website where a buyer can purchase a
                  product and a seller can manage inventory.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-3 text-dark">Links</h5>
                <ul className="list-unstyled mb-0 ">
                  <li className="mb-1">
                    <a
                      href="/"
                      className="text-dark hover:text-orange-700"
                      style={{ textDecoration: "none" }}
                    >
                      Shop
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="/contact-us"
                      className="text-dark hover:text-orange-700"
                      style={{ textDecoration: "none" }}
                    >
                      Contact us
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="/blog"
                      className="text-dark hover:text-orange-700"
                      style={{ textDecoration: "none" }}
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-1 text-dark">Opening hours</h5>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>saturday to thursday:</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>friday:</td>
                      <td>3pm - 9pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="text-center p-3">
            © {moment().format("YYYY")} Copyright:
            <a
              className="text-dark ml-2"
              target="_blank"
              href="https://shahariar-bhuiyan.vercel.app/"
            >
              Shahariar Bhuiyan
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
