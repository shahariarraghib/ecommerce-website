import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-orange-100">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-5 lg:grid-cols-3">
          <div className="col-span-3 lg:hidden flex justify-items-stretch	 items-center">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-orange-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0rem" }}
              className="col-span-2 flex items-center text-center font-bold uppercase text-orange-700 text-xl cursor-pointer px-2"
            >
              E-commerce
            </span>
          </div>
          <div
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.20rem" }}
            className="hidden lg:block flex items-left col-span-1 text-start text-orange-700 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            E-commerce
          </div>

          <div className="hidden lg:block col-span-1 flex text-black mt-1 text-center ">
            {" "}
            <span
              className="hover:text-orange-700 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer font-bold"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            <span
              className="hover:text-orange-700 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer font-bold"
              onClick={(e) => history.push("/contact-us")}
            >
              Contact
            </span>
            <span
              className="hover:text-orange-700 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer font-bold"
              onClick={(e) => history.push("/blog")}
            >
              About
            </span>
          </div>

          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end">
            {/*  WishList Page Button */}
            <div
              onClick={(e) => history.push("/wish-list")}
              className="hover:bg-orange-700 rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${
                  location.pathname === "/wish-list"
                    ? "fill-current text-gray-800"
                    : ""
                } w-8 h-8 text-gray-600 cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 64 64"
                stroke-width="3"
                stroke="#000000"
                fill="none"
              >
                <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z" />
              </svg>
            </div>
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn hover:bg-orange-700 px-2 py-2 rounded-lg relative"
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28px"
                    height="28px"
                    viewBox="0 0 20 20"
                    version="1.1"
                  >
                    <g id="layer1">
                      <path d="M 10 0 C 4.4830748 0 0 4.4830748 0 10 C 0 15.516925 4.4830748 20 10 20 C 15.516925 20 20 15.516925 20 10 C 20 4.4830748 15.516925 0 10 0 z M 10 1 C 14.976485 1 19 5.0235149 19 10 C 19 12.349397 18.095422 14.478558 16.625 16.080078 L 15.998047 15.878906 L 15.15625 15.646484 L 14.306641 15.449219 L 13.447266 15.287109 L 13.322266 15.25 L 13.212891 15.181641 L 13.125 15.087891 L 13.0625 14.974609 L 13.033203 14.847656 L 13.035156 14.720703 L 13.070312 14.595703 L 13.136719 14.484375 L 13.347656 14.193359 L 13.529297 13.884766 L 13.833984 13.275391 L 14.103516 12.652344 L 14.339844 12.013672 L 14.541016 11.361328 L 14.705078 10.703125 L 14.833984 10.035156 L 14.925781 9.359375 L 14.982422 8.6816406 L 15 8.0019531 L 14.982422 7.5664062 L 14.923828 7.1328125 L 14.830078 6.7070312 L 14.697266 6.2910156 L 14.53125 5.8886719 L 14.330078 5.5 L 14.097656 5.1328125 L 13.830078 4.7871094 L 13.537109 4.4648438 L 13.212891 4.171875 L 12.869141 3.90625 L 12.5 3.6699219 L 12.113281 3.46875 L 11.710938 3.3027344 L 11.294922 3.1699219 L 10.867188 3.0761719 L 10.435547 3.0195312 L 10 3 L 9.5644531 3.0195312 L 9.1328125 3.0761719 L 8.7050781 3.1699219 L 8.2890625 3.3027344 L 7.8867188 3.46875 L 7.5 3.6699219 L 7.1328125 3.90625 L 6.7871094 4.171875 L 6.4628906 4.4648438 L 6.1699219 4.7871094 L 5.9042969 5.1328125 L 5.6699219 5.5 L 5.46875 5.8886719 L 5.3027344 6.2910156 L 5.1699219 6.7070312 L 5.0761719 7.1328125 L 5.0195312 7.5664062 L 5 8.0019531 L 5.0175781 8.6816406 L 5.0742188 9.359375 L 5.1660156 10.035156 L 5.2949219 10.703125 L 5.4589844 11.361328 L 5.6601562 12.013672 L 5.8984375 12.652344 L 6.1660156 13.275391 L 6.4707031 13.884766 L 6.6523438 14.193359 L 6.8632812 14.484375 L 6.9296875 14.595703 L 6.9648438 14.720703 L 6.96875 14.847656 L 6.9375 14.974609 L 6.875 15.087891 L 6.7871094 15.181641 L 6.6777344 15.25 L 6.5527344 15.287109 L 5.6953125 15.449219 L 4.84375 15.646484 L 4.0019531 15.878906 L 3.375 16.080078 C 1.9045777 14.478558 1 12.349397 1 10 C 1 5.0235149 5.0235149 1 10 1 z M 10 4 L 10.392578 4.0195312 L 10.78125 4.078125 L 11.160156 4.1738281 L 11.529297 4.3046875 L 11.886719 4.4746094 L 12.222656 4.6738281 L 12.537109 4.9082031 L 12.830078 5.171875 L 13.091797 5.4628906 L 13.326172 5.7792969 L 13.527344 6.1152344 L 13.695312 6.4707031 L 13.828125 6.8398438 L 13.923828 7.2207031 L 13.982422 7.609375 L 14 8.0019531 L 13.984375 8.6289062 L 13.931641 9.2519531 L 13.845703 9.8710938 L 13.728516 10.486328 L 13.576172 11.09375 L 13.390625 11.693359 L 13.173828 12.279297 L 12.925781 12.855469 L 12.646484 13.416016 L 12.509766 13.644531 L 12.351562 13.865234 L 12.220703 14.0625 L 12.121094 14.279297 L 12.056641 14.509766 L 12.029297 14.748047 L 12.042969 14.986328 L 12.091797 15.220703 L 12.177734 15.443359 L 12.298828 15.652344 L 12.451172 15.835938 L 12.628906 15.996094 L 12.830078 16.123047 L 13.052734 16.216797 L 13.283203 16.273438 L 14.099609 16.427734 L 14.912109 16.615234 L 15.712891 16.835938 L 15.8125 16.867188 C 14.244524 18.195439 12.219491 19 10 19 C 7.7805094 19 5.7554759 18.195439 4.1875 16.867188 L 4.2871094 16.835938 L 5.0878906 16.615234 L 5.9003906 16.427734 L 6.7167969 16.273438 L 6.9472656 16.216797 L 7.1699219 16.123047 L 7.3710938 15.996094 L 7.5507812 15.835938 L 7.7011719 15.652344 L 7.8222656 15.443359 L 7.9101562 15.220703 L 7.9570312 14.986328 L 7.9707031 14.748047 L 7.9433594 14.509766 L 7.8789062 14.279297 L 7.7792969 14.0625 L 7.6484375 13.865234 L 7.4902344 13.644531 L 7.3535156 13.416016 L 7.0742188 12.855469 L 6.8261719 12.279297 L 6.609375 11.693359 L 6.4238281 11.09375 L 6.2734375 10.486328 L 6.1542969 9.8710938 L 6.0683594 9.2519531 L 6.015625 8.6289062 L 6 8.0019531 L 6.0195312 7.609375 L 6.078125 7.2207031 L 6.171875 6.8398438 L 6.3046875 6.4707031 L 6.4726562 6.1152344 L 6.6738281 5.7792969 L 6.9082031 5.4628906 L 7.1699219 5.171875 L 7.4628906 4.9082031 L 7.7773438 4.6738281 L 8.1152344 4.4746094 L 8.4707031 4.3046875 L 8.8398438 4.1738281 L 9.21875 4.078125 L 9.6074219 4.0195312 L 10 4 z " />
                    </g>
                  </svg>
                  <div className="userDropdown absolute right-0 mt-1 bg-white rounded">
                    {!isAdmin() ? (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/user/orders")}
                            className="flex space-x-2 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18px"
                                height="18px"
                                viewBox="0 0 1024 1024"
                                fill="#000000"
                                class="icon mt-1 mr-2"
                                version="1.1"
                              >
                                <path
                                  d="M53.6 1023.2c-6.4 0-12.8-2.4-17.6-8-4.8-4.8-7.2-11.2-6.4-18.4L80 222.4c0.8-12.8 11.2-22.4 24-22.4h211.2v-3.2c0-52.8 20.8-101.6 57.6-139.2C410.4 21.6 459.2 0.8 512 0.8c108 0 196.8 88 196.8 196.8 0 0.8-0.8 1.6-0.8 2.4v0.8H920c12.8 0 23.2 9.6 24 22.4l49.6 768.8c0.8 2.4 0.8 4 0.8 6.4-0.8 13.6-11.2 24.8-24.8 24.8H53.6z m25.6-48H944l-46.4-726.4H708v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8s-44.8-20-44.8-44.8c0-14.4 7.2-27.2 20-36h0.8v-57.6H363.2v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8-24.8 0-44.8-20-44.8-44.8 0-14.4 7.2-27.2 20-36h0.8v-57.6H125.6l-46.4 726.4zM512 49.6c-81.6 0-148.8 66.4-148.8 148.8v3.2h298.4l-0.8-1.6v-1.6c0-82.4-67.2-148.8-148.8-148.8z"
                                  fill=""
                                />
                              </svg>
                            </span>
                            <span className="text-black">My Orders</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/profile")}
                            className="flex space-x-2 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 512 512"
                                version="1.1"
                              >
                                <g id="Layer_1" />

                                <g id="Layer_2">
                                  <g>
                                    <path
                                      class="st0"
                                      d="M256,240.9c27.17,0,53.02-13.76,72.79-38.74c17.74-22.42,27.92-50.59,27.92-77.28    c0-27.1-10.74-52.05-30.25-70.28C307.74,37.13,282.72,27.5,256,27.5s-51.74,9.63-70.45,27.1c-19.51,18.23-30.25,43.18-30.25,70.28    c0,26.7,10.17,54.87,27.92,77.28C202.98,227.15,228.83,240.9,256,240.9z M207.4,77.99C220.16,66.07,237.42,59.5,256,59.5    s35.84,6.57,48.6,18.49c12.96,12.11,20.1,28.76,20.1,46.9c0,38.06-30.65,84.02-68.7,84.02s-68.7-45.96-68.7-84.02    C187.3,106.75,194.44,90.09,207.4,77.99z"
                                    />

                                    <path
                                      class="st0"
                                      d="M103.34,311.64c-10.38,20.53-13.71,45.13-10.19,75.22c3.86,32.95,8.97,61.01,15.61,85.78    c1.87,6.99,8.21,11.86,15.45,11.86H387.8c7.24,0,13.58-4.87,15.46-11.86c6.64-24.81,11.74-52.87,15.58-85.77    c3.53-30.08,0.2-54.68-10.18-75.22c-10.61-21.01-29.95-39.66-54.45-52.53c-5.38-2.82-11.04-5.4-16.81-7.65    c-4.63-1.81-9.84-1.36-14.09,1.2C302.47,265.25,279.2,271.9,256,271.9c-23.19,0-46.47-6.65-67.31-19.23    c-4.25-2.57-9.46-3.01-14.09-1.2c-5.77,2.26-11.43,4.83-16.81,7.66C133.28,271.99,113.95,290.64,103.34,311.64z M172.65,287.46    c2.18-1.14,4.42-2.24,6.7-3.28c23.96,12.92,50.29,19.72,76.64,19.72c26.35,0,52.68-6.79,76.64-19.72c2.28,1.04,4.52,2.13,6.7,3.27    c18.65,9.79,33.12,23.5,40.76,38.62c7.56,14.96,9.77,33.09,6.96,57.05c0,0,0,0.01,0,0.01c-3.06,26.15-6.91,48.98-11.73,69.36    H136.68c-4.81-20.35-8.68-43.18-11.74-69.36c-2.81-23.98-0.59-42.11,6.97-57.07C139.53,310.97,154.01,297.25,172.65,287.46z"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </span>
                            <span className="text-black">My Account</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/wish-list")}
                            className="flex space-x-2 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </span>
                            <span className="text-black">My Wishlist</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/setting")}
                            className="flex space-x-1 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span className="text-black">Setting</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </span>
                            <span className="text-black">Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/admin/dashboard")}
                            className="flex space-x-3 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                height="24px"
                                width="24px"
                                version="1.1"
                                id="Capa_1"
                                viewBox="0 0 474.565 474.565"
                              >
                                <g>
                                  <path d="M255.204,102.3c-0.606-11.321-12.176-9.395-23.465-9.395C240.078,95.126,247.967,98.216,255.204,102.3z" />
                                  <path d="M134.524,73.928c-43.825,0-63.997,55.471-28.963,83.37c11.943-31.89,35.718-54.788,66.886-63.826   C163.921,81.685,150.146,73.928,134.524,73.928z" />
                                  <path d="M43.987,148.617c1.786,5.731,4.1,11.229,6.849,16.438L36.44,179.459c-3.866,3.866-3.866,10.141,0,14.015l25.375,25.383   c1.848,1.848,4.38,2.888,7.019,2.888c2.61,0,5.125-1.04,7.005-2.888l14.38-14.404c2.158,1.142,4.55,1.842,6.785,2.827   c0-0.164-0.016-0.334-0.016-0.498c0-11.771,1.352-22.875,3.759-33.302c-17.362-11.174-28.947-30.57-28.947-52.715   c0-34.592,28.139-62.739,62.723-62.739c23.418,0,43.637,13.037,54.43,32.084c11.523-1.429,22.347-1.429,35.376,1.033   c-1.676-5.07-3.648-10.032-6.118-14.683l14.396-14.411c1.878-1.856,2.918-4.38,2.918-7.004c0-2.625-1.04-5.148-2.918-7.004   l-25.361-25.367c-1.94-1.941-4.472-2.904-7.003-2.904c-2.532,0-5.063,0.963-6.989,2.904l-14.442,14.411   c-5.217-2.764-10.699-5.078-16.444-6.825V9.9c0-5.466-4.411-9.9-9.893-9.9h-35.888c-5.451,0-9.909,4.434-9.909,9.9v20.359   c-5.73,1.747-11.213,4.061-16.446,6.825L75.839,22.689c-1.942-1.941-4.473-2.904-7.005-2.904c-2.531,0-5.077,0.963-7.003,2.896   L36.44,48.048c-1.848,1.864-2.888,4.379-2.888,7.012c0,2.632,1.04,5.148,2.888,7.004l14.396,14.403   c-2.75,5.218-5.063,10.708-6.817,16.438H23.675c-5.482,0-9.909,4.441-9.909,9.915v35.889c0,5.458,4.427,9.908,9.909,9.908H43.987z" />
                                  <path d="M354.871,340.654c15.872-8.705,26.773-25.367,26.773-44.703c0-28.217-22.967-51.168-51.184-51.168   c-9.923,0-19.118,2.966-26.975,7.873c-4.705,18.728-12.113,36.642-21.803,52.202C309.152,310.022,334.357,322.531,354.871,340.654z   " />
                                  <path d="M460.782,276.588c0-5.909-4.799-10.693-10.685-10.693H428.14c-1.896-6.189-4.411-12.121-7.393-17.75l15.544-15.544   c2.02-2.004,3.137-4.721,3.137-7.555c0-2.835-1.118-5.553-3.137-7.563l-27.363-27.371c-2.08-2.09-4.829-3.138-7.561-3.138   c-2.734,0-5.467,1.048-7.547,3.138l-15.576,15.552c-5.623-2.982-11.539-5.481-17.751-7.369v-21.958   c0-5.901-4.768-10.685-10.669-10.685H311.11c-2.594,0-4.877,1.04-6.739,2.578c3.26,11.895,5.046,24.793,5.046,38.552   c0,8.735-0.682,17.604-1.956,26.423c7.205-2.656,14.876-4.324,22.999-4.324c36.99,0,67.086,30.089,67.086,67.07   c0,23.637-12.345,44.353-30.872,56.303c13.48,14.784,24.195,32.324,31.168,51.976c1.148,0.396,2.344,0.684,3.54,0.684   c2.733,0,5.467-1.04,7.563-3.13l27.379-27.371c2.004-2.004,3.106-4.721,3.106-7.555s-1.102-5.551-3.106-7.563l-15.576-15.552   c2.982-5.621,5.497-11.555,7.393-17.75h21.957c2.826,0,5.575-1.118,7.563-3.138c2.004-1.996,3.138-4.72,3.138-7.555   L460.782,276.588z" />
                                  <path d="M376.038,413.906c-16.602-48.848-60.471-82.445-111.113-87.018c-16.958,17.958-37.954,29.351-61.731,29.351   c-23.759,0-44.771-11.392-61.713-29.351c-50.672,4.573-94.543,38.17-111.145,87.026l-9.177,27.013   c-2.625,7.773-1.368,16.338,3.416,23.007c4.783,6.671,12.486,10.631,20.685,10.631h315.853c8.215,0,15.918-3.96,20.702-10.631   c4.767-6.669,6.041-15.234,3.4-23.007L376.038,413.906z" />
                                  <path d="M120.842,206.782c0,60.589,36.883,125.603,82.352,125.603c45.487,0,82.368-65.014,82.368-125.603   C285.563,81.188,120.842,80.939,120.842,206.782z" />
                                </g>
                              </svg>
                            </span>
                            <span>Admin Panel</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-orange-700 cursor-pointer"
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                width="28px"
                                height="28px"
                                viewBox="0 0 32 32"
                                version="1.1"
                              >
                                <title>logout</title>
                                <path d="M0 9.875v12.219c0 1.125 0.469 2.125 1.219 2.906 0.75 0.75 1.719 1.156 2.844 1.156h6.125v-2.531h-6.125c-0.844 0-1.5-0.688-1.5-1.531v-12.219c0-0.844 0.656-1.5 1.5-1.5h6.125v-2.563h-6.125c-1.125 0-2.094 0.438-2.844 1.188-0.75 0.781-1.219 1.75-1.219 2.875zM6.719 13.563v4.875c0 0.563 0.5 1.031 1.063 1.031h5.656v3.844c0 0.344 0.188 0.625 0.5 0.781 0.125 0.031 0.25 0.031 0.313 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.344-0.281 0.313-0.844 0-1.156l-7.344-7.313c-0.438-0.469-1.375-0.188-1.375 0.563v3.875h-5.656c-0.563 0-1.063 0.469-1.063 1.031z" />
                              </svg>
                            </span>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              /* Login Modal Button */
              <div
                onClick={(e) => loginModalOpen()}
                className="cursor-pointer hover:bg-orange-700 px-2 py-2 rounded-lg"
                title="Login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28px"
                  height="28px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            )}
            {/* Cart Modal Button */}
            <div
              onClick={(e) => cartModalOpen()}
              className="hover:bg-orange-700 px-2 py-2 rounded-lg relative cursor-pointer"
              title="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                  stroke="#1C274C"
                  stroke-width="1.5"
                />
                <path
                  d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                  stroke="#1C274C"
                  stroke-width="1.5"
                />
                <path
                  d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                  stroke="#1C274C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <span className="absolute top-0 ml-6 mt-1 bg-white rounded px-1 text-black text-xs hover:text-gray-200 font-semibold">
                {data.cartProduct !== null ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            data.navberHamburger && data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-black">
            <span
              className="font-medium text-lg tracking-widest hover:text-orange-700  px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>

            <span
              className="font-medium text-lg tracking-widest hover:text-orange-700  px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/contact-us")}
            >
              Contact
            </span>
            <span
              className="font-medium text-lg tracking-widest hover:text-orange-700  px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/blog")}
            >
              About
            </span>
          </div>
        </div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;
