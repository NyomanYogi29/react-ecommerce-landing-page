export default function CatalogCard({
  name,
  price,
  image,
  category,
  onSelect,
}) {
  return (
    <div
      onClick={onSelect}
      className="flex flex-col bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
    >
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-md overflow-hidden mb-3">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain p-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {name}
        </h3>
        <p className="text-base font-bold text-gray-900 mt-1">{price}</p>
      </div>
    </div>
  );
}
