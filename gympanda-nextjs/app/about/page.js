'use client';
import { FaUsers, FaRunning, FaDumbbell } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; // Import useSession

const About = () => {
  const { data: session } = useSession(); // Get session data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to GymPanda
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          GymPanda is more than just apparel, it's a lifestyle. Our purpose is to empower fitness enthusiasts, from beginners to pros, to push boundaries and perform at their best with top-quality gear that motivates.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mb-16 text-center bg-gray-50 rounded-2xl p-10 mb-16 shadow-xl hover:shadow-2xl transition-all">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
          Our Story
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          GymPanda was born out of the desire to create a fitness brand that truly resonates with athletes. From the beginning, we set out to design gym wear that not only supports peak performance but also reflects the strength and passion of those who wear it. Every piece is engineered to provide the perfect balance of durability, comfort, and style.
        </p>
      </div>

      {/* Mission and Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        <div className="p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all">
          <FaUsers className="w-14 h-14 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Community Driven</h3>
          <p className="text-gray-500">
            At GymPanda, we believe in the power of community. We aim to bring fitness enthusiasts together through shared passion and dedication to health and wellness. Together, we inspire and motivate one another to reach new heights.
          </p>
        </div>

        <div className="p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all">
          <FaRunning className="w-14 h-14 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Performance Focused</h3>
          <p className="text-gray-500">
            Every GymPanda product is designed with one goal in mind: to enhance your performance. Whether you're lifting heavy or running miles, our gear supports you every step of the way—built to last and engineered for the most intense workouts.
          </p>
        </div>

        <div className="p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all">
          <FaDumbbell className="w-14 h-14 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Empowerment</h3>
          <p className="text-gray-500">
            GymPanda empowers you to feel your strongest, both physically and mentally. Our fitness apparel is designed to help you achieve your goals while making you look and feel your best—because we believe in the power of feeling great.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
        {/* Conditionally render the button based on session */}
        {!session && (
        <div className="text-center bg-gray-50 rounded-2xl p-10 mb-16 shadow-xl hover:shadow-sm transition-all">
          <h2 className="text-gray-800 text-3xl font-bold mb-6">
            Join the GymPanda Movement
          </h2>
          <p className="text-gray-600 mb-6">
            Ready to take your fitness journey to the next level? Join thousands of like-minded athletes and discover the power of GymPanda gear that moves with you.
          </p>
          <Link 
            href="/auth/register" 
            className="bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
        )}
    </div>
  );
};

export default About;