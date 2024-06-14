import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const Submenu = (props) => {
  const { categoryId, category, product } = props.value;
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 lg:pt-5">
        <div className="flex justify-between items-center">
          <div className="text-sm flex space-x-2">
            <span
              className="hover:text-orange-700 cursor-pointer font-weight-bold text-lg"
              onClick={(e) => history.push("/")}
            >
              Shop /
            </span>
            <span
              className="hover:text-orange-700 cursor-pointer font-weight-bold text-lg"
              onClick={(e) => history.push(`/products/category/${categoryId}`)}
            >
              {category} /
            </span>
            <span className="text-orange-700 cursor-default font-weight-bold text-lg">
              {product}
            </span>
          </div>
          <div></div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

export default Submenu;
