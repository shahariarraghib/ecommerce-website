import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/product/all-product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPorductImage = async ({ pImage }) => {
  console.log("add", pImage);
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
};

export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
}) => {
  console.log(
    pName,
    pDescription,
    pStatus,
    pCategory,
    pQuantity,
    pPrice,
    pOffer
  );

  let formData = new FormData();

  // Append each URL as a separate form field with the same key
  if (pImage) {
    pImage.forEach((image, index) => {
      formData.append(`pImage[${index}]`, image);
    });
  }

  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  // Debugging the form data before sending
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  try {
    let res = await axios.post(`${apiURL}/api/product/add-product`, formData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product) => {
  console.log("sgsgsdgsdg", product);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  // if (product.pEditImages) {
  //   for (const file of product.pEditImages) {
  //     formData.append("pImages", file);
  //   }
  // }

  if (product.pImages) {
    product.pImages.forEach((image, index) => {
      formData.append(`pImage[${index}]`, image);
    });
  }
  /* Most important part for updating multiple image  */
  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  // formData.append("pImages", product.pImages);

  // Debugging the form data before sending
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
  try {
    let res = await axios.post(`${apiURL}/api/product/edit-product`, formData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-product`, { pId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (catId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-category`, {
      catId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByPrice = async (price) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-price`, {
      price,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
