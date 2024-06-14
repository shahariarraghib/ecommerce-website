import React, { Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";

const AdminSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fragment>
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa" }}
        id="sidebar"
        className="hidden md:block sticky top-0 left-0 h-screen md:w-3/12 lg:w-2/12 sidebarShadow bg-white text-black"
      >
        <div
          onClick={(e) => history.push("/admin/dashboard")}
          className={`${
            location.pathname === "/admin/dashboard"
              ? "border-r-4 border-orange-700 bg-orange-200"
              : ""
          } hover:bg-orange-700 hover:text-white cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="#000000"
                stroke-width="2"
                d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5ZM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3ZM14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z"
              />
            </svg>
          </span>
          <span className="text-xl fw-bold">Dashboard</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? "border-r-4 border-orange-700 bg-orange-200"
              : ""
          } hover:bg-orange-700 hover:text-white cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 48 48"
            >
              <title>category-list</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M24,10h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,10Z" />
                  <path d="M24,24h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,24Z" />
                  <path d="M24,38h0a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H26A2,2,0,0,1,24,38Z" />
                  <path d="M12,7.9,14.4,12H9.5L12,7.9M12,2a2.1,2.1,0,0,0-1.7,1L4.2,13a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H18a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-6-10A1.9,1.9,0,0,0,12,2Z" />
                  <path d="M12,30a6,6,0,1,1,6-6A6,6,0,0,1,12,30Zm0-8a2,2,0,1,0,2,2A2,2,0,0,0,12,22Z" />
                  <path d="M16,44H8a2,2,0,0,1-2-2V34a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v8A2,2,0,0,1,16,44Zm-6-4h4V36H10Z" />
                </g>
              </g>
            </svg>
          </span>
          <span className="text-xl fw-bold">Categories</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? "border-r-4 border-orange-700 bg-orange-200"
              : ""
          } hover:bg-orange-700 hover:text-white cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="0 0 52 52"
            >
              <path d="m24 35.33a.81.81 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.32 2.44h-16.42a2.45 2.45 0 0 1 -2.44-2.28v-11.57a.81.81 0 0 1 .71-.81h19.66zm23.61 0a.82.82 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.33 2.44h-16.42a2.44 2.44 0 0 1 -2.43-2.28v-11.57a.81.81 0 0 1 .71-.81h19.61zm-29.92 3.37-.09.07-4.6 5.06-2.11-2a.62.62 0 0 0 -.79-.07l-.08.07-.87.78a.49.49 0 0 0 -.07.71l.07.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.15 1.15 0 0 0 .87-.36l5.52-5.84a.63.63 0 0 0 .06-.72l-.06-.07-.87-.78a.61.61 0 0 0 -.85-.12zm23.61 0-.09.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.49.49 0 0 0 -.06.71l.06.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.14 1.14 0 0 0 .87-.36l5.56-5.89a.65.65 0 0 0 0-.72v-.07l-.87-.78a.61.61 0 0 0 -.83-.07zm-18.76-11.52a2.36 2.36 0 0 1 2.27 2.28v2.61a.81.81 0 0 1 -.66.81h-21.39a.78.78 0 0 1 -.76-.7v-2.55a2.38 2.38 0 0 1 2.13-2.44h18.41zm25.18 0a2.36 2.36 0 0 1 2.28 2.28v2.61a.81.81 0 0 1 -.66.81h-21.4a.78.78 0 0 1 -.75-.71v-2.54a2.38 2.38 0 0 1 2.13-2.44h18.4zm-12-17a.81.81 0 0 1 .8.71v11.48a2.44 2.44 0 0 1 -2.28 2.44h-16.37a2.46 2.46 0 0 1 -2.44-2.29v-11.52a.81.81 0 0 1 .71-.8h19.62zm-6.27 3.37-.08.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.5.5 0 0 0 -.07.71l.07.08 3 2.82a1.22 1.22 0 0 0 .87.37 1.13 1.13 0 0 0 .87-.37l5.53-5.83a.65.65 0 0 0 .05-.72l-.05-.07-.87-.78a.62.62 0 0 0 -.77-.15zm6.31-11.55a2.44 2.44 0 0 1 2.43 2.28v2.61a.83.83 0 0 1 -.71.81h-22.86a.81.81 0 0 1 -.81-.7v-2.56a2.44 2.44 0 0 1 2.27-2.44z" />
            </svg>
          </span>
          <span className="text-xl fw-bold">Product</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/orders")}
          className={`${
            location.pathname === "/admin/dashboard/orders"
              ? "border-r-4 border-orange-700 bg-orange-200"
              : ""
          } hover:bg-orange-700 hover:text-white cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="5"
                y="4"
                width="14"
                height="17"
                rx="2"
                stroke="#33363F"
                stroke-width="2"
              />
              <path
                d="M9 9H15"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M9 13H15"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M9 17H13"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <span className="text-xl fw-bold">Order</span>
        </div>
        <hr className="border-b border-gray-200" />
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
