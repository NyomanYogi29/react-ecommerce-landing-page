export const priceParcer = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price).repalce(/[^0-9]/g, "")) || 0;
};
