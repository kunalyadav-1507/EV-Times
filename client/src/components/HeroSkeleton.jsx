function HeroSkeleton() {
  return (
    <div className="animate-pulse mb-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero Image */}

        <div className="h-[450px] bg-gray-300 rounded-3xl mb-8"></div>

        {/* Hero Title */}

        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>

        <div className="h-10 bg-gray-300 rounded w-1/2 mb-6"></div>

        {/* Hero Description */}

        <div className="h-5 bg-gray-300 rounded w-full mb-3"></div>

        <div className="h-5 bg-gray-300 rounded w-5/6 mb-3"></div>

        <div className="h-5 bg-gray-300 rounded w-3/4"></div>

      </div>

    </div>
  );
}

export default HeroSkeleton;