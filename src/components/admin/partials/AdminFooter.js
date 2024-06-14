import React, { Fragment } from "react";
import moment from "moment";
const AdminFooter = (props) => {
  return (
    <Fragment>
      {" "}
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
    </Fragment>
  );
};

export default AdminFooter;
