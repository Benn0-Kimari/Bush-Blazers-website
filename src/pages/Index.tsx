
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageCard } from '@/components/PackageCard';
import { Navbar } from '@/components/Navbar';
import { Link } from "react-router-dom";
import Footer from '@/components/Footer';

// Example package data (in a real app, this would come from an API)
const featuredPackages = [
  {
    id: "1",
    title: "Safari Adventure",
    location: "Serengeti, Tanzania",
    price: 2499,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "Mountain Explorer",
    location: "Swiss Alps",
    price: 1899,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Tropical Paradise",
    location: "Maldives",
    price: 3299,
    duration: "6 days",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Desert Adventure",
    location: "Dubai, UAE",
    price: 1999,
    duration: "4 days",
    image: "https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?ixlib=rb-4.0.3"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3")'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Experience unforgettable journeys with our carefully curated travel packages
          </p>
          <div className="flex w-full max-w-md gap-4">
            <Input 
              placeholder="Where do you want to go?" 
              className="bg-white"
            />
            <Button size="lg">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/packages">
            <Button size="lg" variant="secondary">
              View All Packages
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bush Blazers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Experiences</h3>
              <p className="text-gray-600">Carefully selected destinations and activities for unforgettable memories</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Professional local guides with extensive knowledge and experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for peace of mind during your journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest travel deals and updates
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
