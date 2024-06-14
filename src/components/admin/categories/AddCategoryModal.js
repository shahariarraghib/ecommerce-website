import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import { createCategory, getAllCategory } from "./FetchApi";
import axios from "axios"; // Import Axios
const AddCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  // Function to upload image to ImageBB
  const uploadImageToImageBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("key", process.env.REACT_APP_IMGBB_API_KEY);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      return response.data.data.url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 2000);
  }

  const submitForm = async (e) => {
    dispatch({ type: "loading", payload: true });
    // Reset and prevent the form
    e.preventDefault();
    // e.target.reset();

    if (!fData.cImage) {
      dispatch({ type: "loading", payload: false });
      return setFdata({ ...fData, error: "Please upload a category image" });
    }

    try {
      // Upload the image to ImageBB
      const imageUrl = await uploadImageToImageBB(fData.cImage);

      // Check if the image was uploaded successfully
      if (!imageUrl) {
        setFdata({ ...fData, error: "Failed to upload image" });
        setTimeout(() => {
          setFdata({ ...fData, error: false });
        }, 2000);
        return;
      }

      // Prepare form data with the image URL
      const formDataWithUrl = { ...fData, cImage: imageUrl };
      console.log(formDataWithUrl);

      // Call createCategory function and handle response
      let responseData = await createCategory(formDataWithUrl);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          setFdata({
            ...fData,
            cName: "",
            cDescription: "",
            cImage: "",
            cStatus: "Active",
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "loading", payload: false });
      setFdata({ ...fData, error: "An error occurred during submission" });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 2000);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })}
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Category
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "addCategoryModal", payload: false })
              }
              className="cursor-pointer text-orange-700 py-2 px-2 rounded-full hover:bg-orange-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Category Name</label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cName: e.target.value,
                  })
                }
                value={fData.cName}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-700"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="description">Category Description</label>
              <textarea
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cDescription: e.target.value,
                  })
                }
                value={fData.cDescription}
                className="px-4 py-2 border focus:outline-none focus:border-orange-700"
                name="description"
                id="description"
                cols={5}
                rows={5}
              />
            </div>
            {/* Image Field & function */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="name">Category Image</label>
              <input
                accept=".jpg, .jpeg, .png, .webp"
                onChange={(e) => {
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cImage: e.target.files[0],
                  });
                }}
                className="px-4 py-2 border focus:outline-none"
                type="file"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full focus:outline-none focus:bg-none">
              <label htmlFor="status">Category Status</label>
              <select
                cl
                name="status"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cStatus: e.target.value,
                  })
                }
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-700"
                id="status"
              >
                <option name="status" value="Active" className="">
                  Active
                </option>
                <option name="status" value="Disabled" className="">
                  Disabled
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-12">
              <button
                type="submit"
                className="bg-orange-100 text-black p-4 w-full rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                shadow-lg text-center cursor-pointer"
              >
                Create category
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;
