
import React from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3")'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Bush Blazers
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Pioneering adventure travel since 2010
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>
          <p className="mb-6 text-lg">
            Bush Blazers was founded in 2010 by a group of passionate travelers who believed that exploring the world should be accessible, sustainable, and transformative. What began as a small operation has grown into a leading adventure travel company, known for our commitment to authentic experiences and responsible tourism.
          </p>
          <p className="mb-6 text-lg">
            Our mission is to connect travelers with extraordinary places, people, and cultures, creating meaningful experiences that enrich lives and inspire a deeper understanding of our world.
          </p>
          
          <h2 className="text-3xl font-bold mt-12 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p>We are committed to minimizing our environmental impact and supporting conservation efforts in the destinations we visit.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p>We partner with local communities to ensure that tourism benefits the people who call our destinations home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Adventure</h3>
              <p>We believe in pushing boundaries, trying new things, and embracing the unknown through thoughtful adventure.</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mt-12 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <h3 className="text-xl font-semibold">Michael Johnson</h3>
              <p className="text-gray-600">Lead Guide</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <h3 className="text-xl font-semibold">Sarah Williams</h3>
              <p className="text-gray-600">Customer Experience</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
