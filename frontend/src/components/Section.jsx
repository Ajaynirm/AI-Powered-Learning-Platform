export function Section({ title, items, color }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col justify-center items-center min-w-sm lg:max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <div className="flex gap-5 ">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex   gap-2 px-3 py-2 rounded-lg border text-sm ${color} 
                        hover:shadow-sm transition-all w-40`}
          >
            <span className="font-medium">{index + 1}.</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

