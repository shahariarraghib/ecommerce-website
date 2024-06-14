import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = (props) => {
  let { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext); // Layout Context

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0); // Slide change state

  const [quantitiy, setQuantitiy] = useState(1); // Increse and decrese quantity state
  const [, setAlertq] = useState(false); // Alert when quantity greater than stock

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  ); // Wishlist State Control

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          }); // Dispatch in layout context
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() }); // This function change cart in cart state
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct(); // Updating cart total
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products }); // Layout context Cartproduct fetch and dispatch
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 16 16"
          fill="none"
          className="animate-spin"
        >
          <path
            d="M7.706 0.290 C 7.484 0.362,7.356 0.490,7.294 0.699 C 7.259 0.816,7.253 1.088,7.253 2.508 C 7.253 4.389,7.251 4.365,7.443 4.557 C 7.700 4.813,8.300 4.813,8.557 4.557 C 8.749 4.365,8.747 4.389,8.747 2.508 C 8.747 0.688,8.744 0.656,8.596 0.480 C 8.472 0.333,8.339 0.284,8.040 0.276 C 7.893 0.272,7.743 0.278,7.706 0.290 M2.753 2.266 C 2.595 2.338,2.362 2.566,2.281 2.728 C 2.197 2.897,2.193 3.085,2.269 3.253 C 2.343 3.418,4.667 5.750,4.850 5.843 C 5.109 5.976,5.375 5.911,5.643 5.649 C 5.907 5.391,5.977 5.111,5.843 4.850 C 5.750 4.667,3.418 2.343,3.253 2.269 C 3.101 2.200,2.901 2.199,2.753 2.266 M12.853 2.282 C 12.730 2.339,12.520 2.536,11.518 3.541 C 10.597 4.464,10.316 4.762,10.271 4.860 C 10.195 5.025,10.196 5.216,10.272 5.378 C 10.342 5.528,10.572 5.764,10.727 5.845 C 10.884 5.927,11.117 5.926,11.280 5.843 C 11.447 5.757,13.757 3.447,13.843 3.280 C 13.926 3.118,13.927 2.884,13.846 2.729 C 13.764 2.572,13.552 2.364,13.392 2.283 C 13.213 2.192,13.048 2.192,12.853 2.282 M0.699 7.292 C 0.404 7.385,0.258 7.620,0.258 7.999 C 0.259 8.386,0.403 8.618,0.698 8.706 C 0.816 8.741,1.079 8.747,2.508 8.747 C 3.997 8.747,4.196 8.742,4.318 8.702 C 4.498 8.644,4.644 8.498,4.702 8.318 C 4.788 8.053,4.745 7.677,4.608 7.491 C 4.578 7.451,4.492 7.384,4.417 7.343 L 4.280 7.267 2.547 7.261 C 1.152 7.257,0.791 7.263,0.699 7.292 M11.745 7.278 C 11.622 7.308,11.452 7.411,11.392 7.492 C 11.255 7.677,11.212 8.053,11.298 8.318 C 11.356 8.498,11.502 8.644,11.682 8.702 C 11.804 8.742,12.003 8.747,13.492 8.747 C 14.921 8.747,15.184 8.741,15.302 8.706 C 15.597 8.618,15.741 8.386,15.742 7.999 C 15.742 7.614,15.595 7.383,15.290 7.291 C 15.187 7.260,14.864 7.254,13.496 7.256 C 12.578 7.258,11.790 7.268,11.745 7.278 M4.853 10.282 C 4.730 10.339,4.520 10.536,3.518 11.541 C 2.597 12.464,2.316 12.762,2.271 12.860 C 2.195 13.025,2.196 13.216,2.272 13.378 C 2.342 13.528,2.572 13.764,2.727 13.845 C 2.884 13.927,3.117 13.926,3.280 13.843 C 3.447 13.757,5.757 11.447,5.843 11.280 C 5.926 11.118,5.927 10.884,5.846 10.729 C 5.764 10.572,5.552 10.364,5.392 10.283 C 5.213 10.192,5.048 10.192,4.853 10.282 M10.753 10.266 C 10.595 10.338,10.362 10.566,10.281 10.728 C 10.197 10.897,10.193 11.085,10.269 11.253 C 10.343 11.418,12.667 13.750,12.850 13.843 C 13.109 13.976,13.375 13.911,13.643 13.649 C 13.907 13.391,13.977 13.111,13.843 12.850 C 13.750 12.667,11.418 10.343,11.253 10.269 C 11.101 10.200,10.901 10.199,10.753 10.266 M7.745 11.277 C 7.620 11.309,7.451 11.412,7.392 11.492 C 7.254 11.678,7.253 11.691,7.253 13.489 C 7.253 14.921,7.259 15.184,7.294 15.302 C 7.382 15.597,7.615 15.741,8.000 15.741 C 8.385 15.741,8.618 15.597,8.706 15.302 C 8.768 15.090,8.767 11.875,8.704 11.690 C 8.644 11.514,8.575 11.430,8.420 11.346 C 8.310 11.286,8.246 11.271,8.057 11.264 C 7.930 11.259,7.790 11.265,7.745 11.277 "
            stroke="none"
            fill-rule="evenodd"
            fill="#c05621"
          />
        </svg>
      </div>
    );
  } else if (!sProduct) {
    return <div>No product</div>;
  }
  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.pCategory._id,
          product: sProduct.pName,
          category: sProduct.pCategory.cName,
        }}
      />
      <section className="m-4 md:mx-12 md:my-6">
        <div className="grid grid-cols-2 md:grid-cols-12">
          <div className="hidden md:block md:col-span-1 md:flex md:flex-col md:space-y-4 md:mr-2">
            <img
              onClick={(e) =>
                slideImage("increase", 0, count, setCount, pImages)
              }
              className={`${
                count === 0 ? "" : "opacity-25"
              } cursor-pointer w-20 h-20 object-cover object-center`}
              src={sProduct.pImages[0]}
              alt="pic"
            />
            <img
              onClick={(e) =>
                slideImage("increase", 1, count, setCount, pImages)
              }
              className={`${
                count === 1 ? "" : "opacity-25"
              } cursor-pointer w-20 h-20 object-cover object-center`}
              src={sProduct.pImages[1]}
              alt="pic"
            />
          </div>
          <div className="col-span-2 md:col-span-7">
            <div className="relative">
              <img
                className="w-full"
                src={sProduct.pImages[count]}
                alt="Pic"
              />
              <div className="absolute inset-0 flex justify-between items-center mb-4">
                <svg
                  onClick={(e) =>
                    slideImage("increase", null, count, setCount, pImages)
                  }
                  className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  onClick={(e) =>
                    slideImage("increase", null, count, setCount, pImages)
                  }
                  className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-8 md:mt-0 md:col-span-4 md:ml-6 lg:ml-12">
            <div className="flex flex-col leading-8">
              <div className="text-2xl tracking-wider">{sProduct.pName}</div>
              <div className="flex justify-between items-center">
                <div className="text-orange-700 font-weight-bold">
                  <span className="mr-1 text-2xl">৳</span>
                  <span className="font-weight-bold">{sProduct.pPrice}</span>
                </div>
                <span>
                  <svg
                    onClick={(e) => isWishReq(e, sProduct._id, setWlist)}
                    className={`${
                      isWish(sProduct._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
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
                  <svg
                    onClick={(e) => unWishReq(e, sProduct._id, setWlist)}
                    className={`${
                      !isWish(sProduct._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="my-4 md:my-6 text-gray-600">
              {sProduct.pDescription}
            </div>
            <div className="my-4 md:my-6">
              <div
                className={`font-weight-bold ${
                  +quantitiy === +sProduct.pQuantity && "border-red-500"
                }`}
              >
                <div
                  className={` ${
                    quantitiy === sProduct.pQuantity && "text-red-500 "
                  }`}
                >
                  Quantity:
                </div>

                {/* Quantity Button */}
                {sProduct.pQuantity !== 0 ? (
                  <Fragment>
                    {layoutData.inCart == null ||
                    (layoutData.inCart !== null &&
                      layoutData.inCart.includes(sProduct._id) === false) ? (
                      <div className="flex items-center space-x-2 mt-2 ">
                        <span
                          className="cursor-pointer"
                          onClick={(e) =>
                            updateQuantity(
                              "decrease",
                              sProduct.pQuantity,
                              quantitiy,
                              setQuantitiy,
                              setAlertq
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 12L18 12"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="font-semibold border border-secondary pl-2 pr-2">
                          {quantitiy}
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={(e) =>
                            updateQuantity(
                              "increase",
                              sProduct.pQuantity,
                              quantitiy,
                              setQuantitiy,
                              setAlertq
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4 12H20M12 4V20"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>

                        <div>
                          {" "}
                          {+quantitiy === +sProduct.pQuantity ? (
                            <span className="text-xs text-red-500 font-weight-bold ml-5">
                              Stock limited
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 12L18 12"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="font-semibold">{quantitiy}</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4 12H20M12 4V20"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </Fragment>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 12L18 12"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">{quantitiy}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 12H20M12 4V20"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                )}
                {/* Quantity Button End */}
              </div>
              {/* Incart and out of stock button */}
              {sProduct.pQuantity !== 0 ? (
                <Fragment>
                  {layoutData.inCart !== null &&
                  layoutData.inCart.includes(sProduct._id) === true ? (
                    <div
                      className={`bg-orange-100 text-black p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                      shadow-lg text-center cursor-pointer mt-5`}
                    >
                      In cart
                    </div>
                  ) : (
                    <div
                      onClick={(e) =>
                        addToCart(
                          sProduct._id,
                          quantitiy,
                          sProduct.pPrice,
                          layoutDispatch,
                          setQuantitiy,
                          setAlertq,
                          fetchData,
                          totalCost
                        )
                      }
                      className={`bg-orange-100 text-black p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                      shadow-lg text-center cursor-pointer mt-5`}
                    >
                      Add to cart
                    </div>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  {layoutData.inCart !== null &&
                  layoutData.inCart.includes(sProduct._id) === true ? (
                    <div
                      className={`bg-orange-100 text-black p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                      shadow-lg text-center cursor-pointer mt-5`}
                    >
                      In cart
                    </div>
                  ) : (
                    <div
                      disabled={true}
                      className="px-4 py-2 text-dark cursor-not-allowed text-center"
                    >
                      Out of stock
                    </div>
                  )}
                </Fragment>
              )}
              {/* Incart and out of stock button End */}
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section two */}
      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;
