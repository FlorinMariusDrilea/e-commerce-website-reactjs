import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Elevate Your Workout with <span className="text-orange-600">GymPanda</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Shop our premium gym wear designed for performance, comfort, and style. Stay fit while looking great.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/shop" 
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Shop Now
          </Link>
          <Link 
            href="/collections" 
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            View Collections
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-gray-600 text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-gray-600 text-3xl font-bold mb-4">Gear Up for Your Best Workout</h2>
        <p className="text-gray-500 mb-6">Shop high-quality gym wear trusted by fitness enthusiasts worldwide.</p>
        <Link 
          href="/shop" 
          className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Performance-Driven",
    description: "Moisture-wicking, breathable fabrics to keep you cool and dry during workouts.",
    icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  },
  {
    title: "Comfort & Fit",
    description: "Designed for movement with stretchable, lightweight materials that adapt to your body.",
    icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  },
  {
    title: "Style & Versatility",
    description: "Trendy gym wear that looks great in and out of the gym—because confidence is key.",
    icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  }
];
