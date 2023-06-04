const ProductCard = ({ image, title, category, price, handleOnAdd }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#898989",
        border: "0",
        boxShadow: "0 7px 7px rgba(0, 0, 0, 0.18)",
        margin: "3em auto",
        width: "100%"
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          maxWidth: "25%",
          margin: "auto",
          padding: "0.5em",
          borderRadius: "0.7em"
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{ maxWidth: "60%", width: "100%" }}>
          <h5>{title}</h5>
          <p>Category: {category}</p>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "40%",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0.3em 0.5em",
            width: "100%"
          }}
        >
          <p>{`$ ${price ?? (0).toFixed(2)}`}</p>
          <button onClick={handleOnAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
