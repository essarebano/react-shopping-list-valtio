const ProductContainer = ({ children, isLoading, isEmpty }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "50%",
        border: "1px solid",
        flexDirection: "column"
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1>Products</h1>
      </div>
      {isLoading && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && isEmpty && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <p>No products available.</p>
        </div>
      )}
      {!isLoading && !isEmpty && children}
    </div>
  );
};

export default ProductContainer;
