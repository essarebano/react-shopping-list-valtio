import { useEffect } from "react";
import { useSnapshot } from "valtio";
import productsStore from "./store/products";
import ProductContainer from "./components/products/ProductContainer";
import ProductCategoryList from "./components/products/ProductCategoryList";
import "./styles.css";

export default function App() {
  const snapProducts = useSnapshot(productsStore);

  console.log({
    snapProducts
  });

  useEffect(() => {
    const getProducts = async () => {
      await productsStore.getProducts();
    };

    getProducts();
  }, []);

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <div style={{}}>
        <ProductContainer
          isLoading={snapProducts.isLoading}
          isEmpty={snapProducts.productIds.length === 0}
        >
          <ProductCategoryList
            productIdsByCategory={snapProducts.productIdsByCategory}
          />
        </ProductContainer>
      </div>
    </div>
  );
}
