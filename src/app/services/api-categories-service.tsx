import { CategoryInterface } from "../interfaces/category-interface";

const baseURL = "https://20.119.34.167:5001";

export const getCategories = async () => {
  return await fetch(`${baseURL}/api/categories`)
    .then((response) => response.json())
    .then((data) => data);
};

export const getCategory = async (id: number) => {
  return await fetch(`${baseURL}/api/categories/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return {
        categoryId: data.id_category,
        categoryName: data.name_category,
      };
    });
};

// export const postProduct = async (product: ProductInterface) => {
//   return await fetch(`${baseURL}/api/products`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   })
//     .then((response) => response.json())
//     .then((data) => data);
// };

// export const updateProduct = async (id: number, product: ProductInterface) => {
//   return await fetch(`${baseURL}/api/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   })
//     .then((response) => response.json())
//     .then((data) => data);
// };

// export const deleteProduct = async (id: number) => {
//   return await fetch(`${baseURL}/api/products/${id}`)
//     .then((response) => response.json())
//     .then((data) => data);
// };
