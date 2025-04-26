
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PackageCard } from '@/components/PackageCard';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Example packages data (in a real app, this would come from an API)
const allPackages = [
  {
    id: "1",
    title: "Safari Adventure",
    location: "Serengeti, Tanzania",
    price: 2499,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3",
    category: "wildlife"
  },
  {
    id: "2",
    title: "Mountain Explorer",
    location: "Swiss Alps",
    price: 1899,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3",
    category: "hiking"
  },
  {
    id: "3",
    title: "Tropical Paradise",
    location: "Maldives",
    price: 3299,
    duration: "6 days",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3",
    category: "beach"
  },
  {
    id: "4",
    title: "Desert Adventure",
    location: "Dubai, UAE",
    price: 1999,
    duration: "4 days",
    image: "https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?ixlib=rb-4.0.3",
    category: "desert"
  },
  {
    id: "5",
    title: "Cultural Discovery",
    location: "Kyoto, Japan",
    price: 2799,
    duration: "8 days",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3",
    category: "cultural"
  },
  {
    id: "6",
    title: "Amazon Expedition",
    location: "Amazon Rainforest, Brazil",
    price: 2599,
    duration: "9 days",
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3",
    category: "wildlife"
  },
  {
    id: "7",
    title: "Northern Lights Tour",
    location: "Tromsø, Norway",
    price: 3199,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3",
    category: "seasonal"
  },
  {
    id: "8",
    title: "Island Hopping",
    location: "Greek Islands",
    price: 2399,
    duration: "10 days",
    image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3",
    category: "beach"
  }
];

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredPackages = allPackages.filter(pkg => {
    // Search term filter
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pkg.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter === 'low') {
      matchesPrice = pkg.price < 2000;
    } else if (priceFilter === 'medium') {
      matchesPrice = pkg.price >= 2000 && pkg.price < 3000;
    } else if (priceFilter === 'high') {
      matchesPrice = pkg.price >= 3000;
    }
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || pkg.category === categoryFilter;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3")'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Our Packages
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Find your perfect adventure from our collection of handcrafted travel experiences
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium mb-1">Search</label>
              <Input
                type="text"
                placeholder="Search by destination or package name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium mb-1">Price Range</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Budget (Under $2000)</SelectItem>
                  <SelectItem value="medium">Mid-range ($2000-$3000)</SelectItem>
                  <SelectItem value="high">Luxury (Over $3000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="wildlife">Wildlife</SelectItem>
                  <SelectItem value="hiking">Hiking</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="desert">Desert</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-auto">
              <Button onClick={() => {
                setSearchTerm('');
                setPriceFilter('all');
                setCategoryFilter('all');
              }}>
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          {filteredPackages.length > 0 
            ? `Available Packages (${filteredPackages.length})` 
            : "No packages match your criteria"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
