import React, { Fragment, useContext } from "react";
import { CategoryContext } from "./index";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoryMenu = (props) => {
  const { dispatch } = useContext(CategoryContext);

  return (
    <Fragment>
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
          {/* It's open the add category modal */}
          <div
            onClick={(e) =>
              dispatch({ type: "addCategoryModal", payload: true })
            }
            className="cursor-pointer rounded-full p-2 flex items-center justify-center text-gray-100 text-sm font-semibold uppercase bg-orange-700"
          >
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
                d="M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM13.5 3.75L12.75 4.5V10.5L13.5 11.25H19.5L20.25 10.5V4.5L19.5 3.75H13.5ZM14.25 9.75V5.25H18.75V9.75H14.25ZM17.25 20.25H15.75V17.25H12.75V15.75H15.75V12.75H17.25V15.75H20.25V17.25H17.25V20.25ZM4.5 12.75L3.75 13.5V19.5L4.5 20.25H10.5L11.25 19.5V13.5L10.5 12.75H4.5ZM5.25 18.75V14.25H9.75V18.75H5.25Z"
                fill="#FFFFFF"
              />
            </svg>
            <span className="p-2">Add Category</span>
          </div>
        </div>
        <AddCategoryModal />
        <EditCategoryModal />
      </div>
    </Fragment>
  );
};

export default CategoryMenu;
