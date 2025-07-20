const Shimmer = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6 py-4">
      {Array(12).fill("").map((_, index) => (
        <div
          key={index}
          className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Shimmer;

