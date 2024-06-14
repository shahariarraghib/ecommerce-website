import React, { Fragment, useContext, useEffect } from "react";
import { DashboardContext } from "./";
import { GetAllData } from "./Action";

const DashboardCard = (props) => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    GetAllData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {/* Card Start */}
      <div className="m-4 grid grid-cols-1 md:grid-cols-4 row-gap-4 col-gap-4">
        <div className="flex flex-col justify-center items-center col-span-1 bg-white p-6 shadow-lg hover:shadow-none cursor-pointer transition-all duration-300 ease-in border-b-4 border-opacity-0 hover:border-opacity-100 border-orange-700">
          <div className="bg-red-200 p-2 cursor-pointer rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="5"
                y="4"
                width="14"
                height="17"
                rx="2"
                stroke="#222222"
              />
              <path d="M9 9H15" stroke="#222222" stroke-linecap="round" />
              <path d="M9 13H15" stroke="#222222" stroke-linecap="round" />
              <path d="M9 17H13" stroke="#222222" stroke-linecap="round" />
            </svg>
          </div>
          <div className="text-2xl font-semibold">
            {data ? data.totalData.Orders : 0}
          </div>
          <div className="text-lg font-medium">Orders</div>
          <div className="flex items-center space-x-1 text-green-500"></div>
        </div>
        <div className="flex flex-col justify-center items-center col-span-1 bg-white p-6 shadow-lg hover:shadow-none cursor-pointer transition-all duration-300 ease-in border-b-4 border-opacity-0 hover:border-opacity-100 border-orange-700 ">
          <div className="bg-indigo-200 p-2 cursor-pointer rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.36264 3.53846C7.60261 3.53846 6.17582 4.96525 6.17582 6.72528C6.17582 8.4853 7.60261 9.91209 9.36264 9.91209C11.1227 9.91209 12.5494 8.4853 12.5494 6.72528C12.5494 4.96525 11.1227 3.53846 9.36264 3.53846ZM4.63736 6.72528C4.63736 4.11558 6.75294 2 9.36264 2C11.9723 2 14.0879 4.11558 14.0879 6.72528C14.0879 9.33497 11.9723 11.4506 9.36264 11.4506C6.75294 11.4506 4.63736 9.33497 4.63736 6.72528Z"
                fill="#030D45"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.41153 15.4066C5.27249 15.4066 3.53846 17.1406 3.53846 19.2797C3.53846 19.3861 3.55682 19.4596 3.57526 19.5013C3.59011 19.5348 3.60106 19.5412 3.60591 19.544C4.13353 19.8541 5.65133 20.4615 9.36264 20.4615C13.0739 20.4615 14.5913 19.8543 15.1189 19.5443C15.1238 19.5414 15.1352 19.5348 15.15 19.5013C15.1685 19.4596 15.1868 19.3861 15.1868 19.2797C15.1868 17.1406 13.4528 15.4066 11.3137 15.4066H7.41153ZM2 19.2797C2 16.291 4.42282 13.8681 7.41153 13.8681H11.3137C14.3024 13.8681 16.7253 16.291 16.7253 19.2797C16.7253 19.7944 16.5513 20.4869 15.8984 20.8706C15.0381 21.3763 13.2089 22 9.36264 22C5.51639 22 3.68722 21.3763 2.82683 20.8706C2.17398 20.4869 2 19.7944 2 19.2797Z"
                fill="#030D45"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.5431 3.88721C15.654 3.47709 16.0763 3.23448 16.4864 3.34532C18.1832 3.80392 19.3626 5.47949 19.3626 7.38461C19.3626 9.39763 17.9829 11.2126 16.0478 11.4451C15.626 11.4957 15.243 11.1949 15.1923 10.7731C15.1416 10.3513 15.4425 9.96824 15.8643 9.91758C16.8962 9.79362 17.8242 8.75741 17.8242 7.38461C17.8242 6.08213 17.0256 5.0847 16.085 4.8305C15.6749 4.71966 15.4323 4.29733 15.5431 3.88721Z"
                fill="#030D45"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8384 14.4901C17.9197 14.0731 18.3237 13.801 18.7407 13.8824C20.6337 14.2516 22 15.91 22 17.8388V18.3735C22 18.8469 21.858 19.5212 21.2404 19.9159C20.8246 20.1817 20.1798 20.4649 19.1855 20.666C18.7691 20.7503 18.3633 20.481 18.279 20.0646C18.1948 19.6482 18.464 19.2424 18.8804 19.1581C19.7287 18.9865 20.1871 18.7633 20.4118 18.6197L20.4136 18.6179C20.4153 18.6158 20.4213 18.6077 20.4287 18.5896C20.4451 18.5498 20.4615 18.4784 20.4615 18.3735V17.8388C20.4615 16.6462 19.6167 15.6207 18.4462 15.3924C18.0292 15.311 17.7571 14.9071 17.8384 14.4901Z"
                fill="#030D45"
              />
            </svg>
          </div>
          <div className="text-2xl font-semibold">
            {data ? data.totalData.Users : 0}
          </div>
          <div className="text-lg font-medium">Customers</div>
          <div className="flex items-center space-x-1 text-green-500"></div>
        </div>
        <div className="flex flex-col justify-center items-center col-span-1 bg-white p-6 shadow-lg hover:shadow-none cursor-pointer transition-all duration-300 ease-in border-b-4 border-opacity-0 hover:border-opacity-100 border-orange-700">
          <div className="bg-green-200 p-2 cursor-pointer rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="0 0 52 52"
            >
              <path d="m24 35.33a.81.81 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.32 2.44h-16.42a2.45 2.45 0 0 1 -2.44-2.28v-11.57a.81.81 0 0 1 .71-.81h19.66zm23.61 0a.82.82 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.33 2.44h-16.42a2.44 2.44 0 0 1 -2.43-2.28v-11.57a.81.81 0 0 1 .71-.81h19.61zm-29.92 3.37-.09.07-4.6 5.06-2.11-2a.62.62 0 0 0 -.79-.07l-.08.07-.87.78a.49.49 0 0 0 -.07.71l.07.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.15 1.15 0 0 0 .87-.36l5.52-5.84a.63.63 0 0 0 .06-.72l-.06-.07-.87-.78a.61.61 0 0 0 -.85-.12zm23.61 0-.09.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.49.49 0 0 0 -.06.71l.06.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.14 1.14 0 0 0 .87-.36l5.56-5.89a.65.65 0 0 0 0-.72v-.07l-.87-.78a.61.61 0 0 0 -.83-.07zm-18.76-11.52a2.36 2.36 0 0 1 2.27 2.28v2.61a.81.81 0 0 1 -.66.81h-21.39a.78.78 0 0 1 -.76-.7v-2.55a2.38 2.38 0 0 1 2.13-2.44h18.41zm25.18 0a2.36 2.36 0 0 1 2.28 2.28v2.61a.81.81 0 0 1 -.66.81h-21.4a.78.78 0 0 1 -.75-.71v-2.54a2.38 2.38 0 0 1 2.13-2.44h18.4zm-12-17a.81.81 0 0 1 .8.71v11.48a2.44 2.44 0 0 1 -2.28 2.44h-16.37a2.46 2.46 0 0 1 -2.44-2.29v-11.52a.81.81 0 0 1 .71-.8h19.62zm-6.27 3.37-.08.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.5.5 0 0 0 -.07.71l.07.08 3 2.82a1.22 1.22 0 0 0 .87.37 1.13 1.13 0 0 0 .87-.37l5.53-5.83a.65.65 0 0 0 .05-.72l-.05-.07-.87-.78a.62.62 0 0 0 -.77-.15zm6.31-11.55a2.44 2.44 0 0 1 2.43 2.28v2.61a.83.83 0 0 1 -.71.81h-22.86a.81.81 0 0 1 -.81-.7v-2.56a2.44 2.44 0 0 1 2.27-2.44z" />
            </svg>
          </div>
          <div className="text-2xl font-semibold">
            {data ? data.totalData.Products : 0}
          </div>
          <div className="text-lg font-medium">Products</div>
        </div>
        <div className="flex flex-col justify-center items-center col-span-1 bg-white p-6 shadow-lg hover:shadow-none cursor-pointer transition-all duration-300 ease-in border-b-4 border-opacity-0 hover:border-opacity-100 border-orange-700">
          <div className="bg-orange-200 p-2 cursor-pointer rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z"
                fill="#292D32"
              />
              <path
                opacity="0.4"
                d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z"
                fill="#292D32"
              />
              <path
                d="M18.6695 13.4302H16.7695C14.5895 13.4302 13.4395 14.5802 13.4395 16.7602V18.6602C13.4395 20.8402 14.5895 21.9902 16.7695 21.9902H18.6695C20.8495 21.9902 21.9995 20.8402 21.9995 18.6602V16.7602C21.9995 14.5802 20.8495 13.4302 18.6695 13.4302Z"
                fill="#292D32"
              />
              <path
                opacity="0.4"
                d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z"
                fill="#292D32"
              />
            </svg>
          </div>
          <div className="text-2xl font-semibold">
            {data ? data.totalData.Categories : 0}
          </div>
          <div className="text-lg font-medium">Categories</div>
        </div>
      </div>
      {/* End Card */}
    </Fragment>
  );
};

export default DashboardCard;
