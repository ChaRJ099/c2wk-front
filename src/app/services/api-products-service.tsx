import {
  ProductInterface,
  ProductPostPayload,
} from "../interfaces/product-interface";

const baseURL = "http://23.97.147.233:5001";

// Products

export const getProducts = async () => {
  return await fetch(`${baseURL}/api/products`)
    .then((response) => response.json())
    .then((data) => data);
};

export const getProduct = async (id: number) => {
  return await fetch(`${baseURL}/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return {
        productId: data.id_product,
        productName: data.name_product,
        price: data.price,
        picture: data.picture,
        description: data.description,
        category: data.name_category,
        categoryId: data.category_id,
      };
    });
};

export const postProduct = async (
  product: ProductPostPayload,
  token: string
) => {
  return await fetch(`${baseURL}/api/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const updateProduct = async (
  id: number,
  product: ProductPostPayload,
  token: string
) => {
  return await fetch(`${baseURL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const deleteProduct = async (id: number, token: string) => {
  return await fetch(`${baseURL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then(({ status }) => status);
};
