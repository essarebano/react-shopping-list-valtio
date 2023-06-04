import ProductList from "./ProductList";

const ProductCategoryList = ({ productIdsByCategory }) => {
  const productCategories = Object.keys(productIdsByCategory);

  return (
    <div>
      {productCategories?.map((category, id) => {
        const key = `category-${id}`;
        const productIds = productIdsByCategory[category];
        return (
          <div
            key={key}
            style={{
              margin: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <div>
              <h2 style={{ textTransform: "capitalize" }}>{category}</h2>
            </div>
            <div>
              <ProductList productIds={productIds} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategoryList;
