export function Navigation() {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-32 z-50 group flex items-center justify-center cursor-pointer">
        <div className="opacity-0 group-hover:opacity-40 transition-opacity duration-300 ease-in-out">
          <span className="text-white text-2xl font-extralight tracking-tighter">
            ←
          </span>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-32 z-50 group flex items-center justify-center cursor-pointer">
        <div className="opacity-0 group-hover:opacity-40 transition-opacity duration-300 ease-in-out">
          <span className="text-white text-2xl font-extralight tracking-tighter">
            →
          </span>
        </div>
      </div>
    </>
  );
}
