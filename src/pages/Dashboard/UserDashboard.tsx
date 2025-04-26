
import React from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PackageCard } from '@/components/PackageCard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

// Mock bookings data for the user
const userBookings = [
  {
    id: "B001",
    packageName: "Safari Adventure",
    packageId: "1",
    date: "2023-12-10",
    travelers: 2,
    status: "Confirmed",
    totalAmount: 4998
  },
  {
    id: "B004",
    packageName: "Mountain Explorer",
    packageId: "2",
    date: "2024-02-15",
    travelers: 1,
    status: "Pending",
    totalAmount: 1899
  }
];

// Mock wishlist data
const userWishlist = [
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

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="mt-4 md:mt-0"
            >
              Sign Out
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
            
            {userBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>Your travel bookings</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Travel Date</TableHead>
                      <TableHead>Travelers</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.packageName}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.travelers}</TableCell>
                        <TableCell>${booking.totalAmount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link to={`/package/${booking.packageId}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-6">You don't have any bookings yet</p>
                <Link to="/packages">
                  <Button>Browse Packages</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="wishlist" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            
            {userWishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userWishlist.map((pkg) => (
                  <PackageCard key={pkg.id} {...pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-6">Your wishlist is empty</p>
                <Link to="/packages">
                  <Button>Discover Packages</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="profile" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={user?.name || ''} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={user?.email || ''} readOnly />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Add your phone number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Add your address" />
                </div>
                
                <div className="pt-4">
                  <Button>Update Profile</Button>
                </div>
                
                <div className="pt-4 border-t mt-8">
                  <h3 className="text-lg font-semibold mb-4">Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button variant="secondary">Change Password</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  );
};

export default UserDashboard;
