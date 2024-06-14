import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess, createOrder } from "./FetchApi";
import { fetchData, fetchbrainTree, pay } from "./Action";

import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
    paymentMethod: "card", // default payment method
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    fetchbrainTree(getBrainTreeToken, setState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentMethodChange = (event) => {
    setState({ ...state, paymentMethod: event.target.value });
  };

  const handlePay = () => {
    if (state.paymentMethod === "card") {
      pay(
        data,
        dispatch,
        state,
        setState,
        getPaymentProcess,
        totalCost,
        history
      );
    }
    console.log(state);
    if (!state.address) {
      setState({ ...state, error: "Please provide your address" });
    } else if (!state.phone) {
      setState({ ...state, error: "Please provide your phone number" });
    } else if (!state.paymentMethod) {
      setState({ ...state, error: "Please select payment Method" });
    } else {
      // Handle cash on delivery
      let orderData = {
        allProduct: JSON.parse(localStorage.getItem("cart")),
        user: JSON.parse(localStorage.getItem("jwt")).user._id,
        amount: totalCost(),
        transactionId: "COD",
        address: state.address,
        phone: state.phone,
      };
      createOrder(orderData)
        .then((resposeData) => {
          if (resposeData.success) {
            localStorage.setItem("cart", JSON.stringify([]));
            dispatch({ type: "cartProduct", payload: null });
            dispatch({ type: "cartTotalCost", payload: null });
            dispatch({ type: "orderSuccess", payload: true });
            setState({ clientToken: "", instance: {} });
            dispatch({ type: "loading", payload: false });
            history.push("/");
          } else if (resposeData.error) {
            console.log(resposeData.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
        Please wait until finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl font-weight-bold ml-1 p-4">Order</div>
        {/* Product List */}
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
            {state.clientToken !== null ? (
              <Fragment>
                <div
                  onBlur={(e) => setState({ ...state, error: false })}
                  className="p-4 md:p-8"
                >
                  {state.error ? (
                    <div className="bg-red-200 py-2 px-4 rounded">
                      {state.error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col py-2">
                    <label htmlFor="address" className="pb-2">
                      Delivery Address
                    </label>
                    <input
                      value={state.address}
                      onChange={(e) =>
                        setState({
                          ...state,
                          address: e.target.value,
                          error: false,
                        })
                      }
                      type="text"
                      id="address"
                      className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-700"
                      placeholder="Address..."
                    />
                  </div>
                  <div className="flex flex-col py-2 mb-2">
                    <label htmlFor="phone" className="pb-2">
                      Phone Number
                    </label>
                    <input
                      value={state.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Ensure the phone number is numeric and doesn't exceed 11 digits
                        if (value.length <= 11 && /^\d*$/.test(value)) {
                          setState({
                            ...state,
                            phone: value,
                            error: false,
                          });
                        }
                      }}
                      type="number"
                      id="phone"
                      className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-700"
                      placeholder="+880"
                    />
                  </div>

                  {/* <select
                      value={state.paymentMethod}
                      onChange={handlePaymentMethodChange}
                      id="paymentMethod"
                      className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-700"
                    >
                      <option value="card">Card Payment</option>
                      <option value="cod">Cash on Delivery</option>
                    </select> */}

                  <div className="flex flex-col py-2 mb-2">
                    <label className="pb-2">Payment Method</label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={state.paymentMethod === "cod"}
                        onChange={handlePaymentMethodChange}
                        className="mr-2"
                      />
                      <label htmlFor="cod">Cash on Delivery</label>
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={state.paymentMethod === "card"}
                        onChange={handlePaymentMethodChange}
                        className="mr-2 ml-4"
                      />
                      <label htmlFor="card" className="mr-4">
                        Card Payment
                      </label>
                    </div>
                  </div>

                  {state.paymentMethod === "card" && (
                    <DropIn
                      options={{
                        authorization: state.clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => (state.instance = instance)}
                    />
                  )}

                  <div
                    onClick={handlePay}
                    className="bg-orange-100 text-black p-4 w-full rounded-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                    shadow-lg text-center cursor-pointer mt-5"
                  >
                    Place Order
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="flex items-center justify-center py-12">
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
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
            >
              <div className="md:flex md:items-center md:space-x-4">
                <img
                  onClick={() => history.push(`/products/${product._id}`)}
                  className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                  src={product.pImages[0]}
                  alt="wishListproduct"
                />
                <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                <div className="md:ml-6 font-semibold text-sm">
                  Price : <span className="mr-1 font-weight-bold">৳</span>
                  {product.pPrice}.00
                </div>
                <div className="md:ml-6 font-semibold text-sm">
                  Quantity : {quantity(product._id)}
                </div>
                <div className="font-semibold text-sm">
                  Items Total : <span className="mr-1 font-weight-bold">৳</span>
                  {subTotal(product._id, product.pPrice)}.00
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No product found for checkout</div>
        )}
        <div className="">
          <div>
            <span className="font-weight-bold">Order Summary</span>
          </div>
          <div>
            {" "}
            <span className="font-weight-bold">Items Total</span>
            <span className="ml-4 font-weight-bold text-orange-700 mr-1">
              ৳
            </span>
            <span className="text-orange-700 ">
              {totalCost(products) - 60}.00
            </span>
          </div>
          <div>
            {" "}
            <span className="font-weight-bold">Delivery Fee</span>
            <span className="ml-3 font-weight-bold text-orange-700 mr-1">
              ৳
            </span>
            <span className="text-orange-700 ">60.00</span>
          </div>

          <div>
            {" "}
            <span className="font-weight-bold">Items Total</span>
            <span className="ml-4 font-weight-bold text-orange-700 mr-1">
              ৳
            </span>
            <span className="text-orange-700">{totalCost(products)}.00</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
