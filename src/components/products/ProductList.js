import productsStore from "../../store/products";
import ProductCard from "./ProductCard";
import { useSnapshot } from "valtio";
const ProductList = ({ productIds }) => {
  const snapProducts = useSnapshot(productsStore);
  return (
    <div>
      {productIds.map((productId) => {
        const { id, title, image, price, category } = snapProducts.productsById[
          productId
        ];
        const key = `product-${id}`;
        return (
          <ProductCard
            key={key}
            title={title}
            image={image}
            price={price}
            category={category}
          />
        );
      })}
    </div>
  );
};
export default ProductList;
