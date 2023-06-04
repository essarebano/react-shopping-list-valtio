import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import { PRODUCTS_URL } from "./constants";
import { getResourceById, getResourceIds } from "./helpers";

const getProductsData = async () => {
  productsStore.isLoading = true;
  try {
    const response = await fetch(PRODUCTS_URL).then((data) => data.json());
    const results = await response;
    console.log({ response, results });
    return results;
  } catch (error) {
    productsStore.error = error;
  } finally {
    productsStore.isLoading = false;
  }
};

const getProductIdsByCategory = (products) => {
  const productCategories = products.map((product) => product.category);
  const productCategoryList = [...new Set(productCategories)];

  const productIdsByCategory = productCategoryList.reduce(
    (accumulator, category) => {
      const productIds = products
        ?.filter((product) => {
          const productCategory = product.category;
          return category === productCategory;
        })
        .map((product) => product.id);
      accumulator[category] = productIds;
      return accumulator;
    },
    {}
  );

  return {
    productCategoryList,
    productIdsByCategory
  };
};

const productsStore = proxy({
  productIds: [],
  productsById: {},
  productCategories: [],
  productIdsByCategory: {},
  isLoading: false,
  error: "",
  getProducts: async () => {
    const productsData = await getProductsData();
    productsStore.productIds = getResourceIds(productsData);
    productsStore.productsById = getResourceById(productsData);
    productsStore.productCategories = getProductIdsByCategory(
      productsData
    ).productCategories;
    productsStore.productIdsByCategory = getProductIdsByCategory(
      productsData
    ).productIdsByCategory;
  }
});

devtools(productsStore, { name: "products store" });

export default productsStore;
