export const priceParcer = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price).replace(/[^0-9]/g, "")) || 0;
};
