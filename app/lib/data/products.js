const API_BASE_URL = "https://dummyjson.com";

export const getAllProducts = async (page, limit) => {
  const skip = (page - 1) * limit;

  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`
  );
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
};
