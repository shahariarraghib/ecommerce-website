import React from "react";
import Layout from "./index";

const PageNotFoundComponent = (props) => {
  return (
    <div className="flex flex-col items-center justify-center my-32">
      <span className="text-center text-orange-700 text-4xl font-bold tracking-widest ">
        404 not found
      </span>
    </div>
  );
};

const PageNotFound = (props) => {
  return <Layout children={<PageNotFoundComponent />} />;
};

export default PageNotFound;
