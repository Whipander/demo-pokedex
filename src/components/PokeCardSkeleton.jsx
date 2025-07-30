const SkeletonElement = ({ className, isDark }) => {
  const darkClass = isDark ? "bg-gray-700" : "bg-gray-300";
  return <div className={`${className} ${darkClass} rounded`}></div>;
};

const PokeCardSkeleton = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  const cardClasses = `
    pixel-border rounded-lg p-4 m-2 flex flex-col items-center w-full min-h-[342px] max-w-[300px]
    transition-all duration-300 
    ${isDark ? "bg-gray-900" : "bg-white"}
    animate-pulse
  `;

  return (
    <div className={cardClasses.trim().replace(/\s+/g, ' ')}>
      <div className="w-full text-right mb-2">
        <SkeletonElement className="h-5 w-12 inline-block" isDark={isDark} />
      </div>

      <div className={`w-32 h-32 flex items-center justify-center mb-4 pixel-border ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>

      <SkeletonElement className="h-7 w-3/4 mb-3" isDark={isDark} />

      <div className="flex justify-center gap-2 mb-4 w-full">
        <SkeletonElement className="h-6 w-16" isDark={isDark} />
        <SkeletonElement className="h-6 w-16" isDark={isDark} />
      </div>

      <div className="w-full mb-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <SkeletonElement className="h-7" isDark={isDark} />
          <SkeletonElement className="h-7" isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default PokeCardSkeleton;
