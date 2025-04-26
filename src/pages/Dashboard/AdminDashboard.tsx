
import React, { useState } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for bookings
const mockBookings = [
  {
    id: "B001",
    packageName: "Safari Adventure",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    date: "2023-12-10",
    travelers: 2,
    status: "Confirmed",
    totalAmount: 4998
  },
  {
    id: "B002",
    packageName: "Mountain Explorer",
    customerName: "Emma Johnson",
    customerEmail: "emma@example.com",
    date: "2023-11-15",
    travelers: 1,
    status: "Pending",
    totalAmount: 1899
  },
  {
    id: "B003",
    packageName: "Tropical Paradise",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    date: "2023-12-20",
    travelers: 3,
    status: "Cancelled",
    totalAmount: 9897
  }
];

// Mock data for packages
const mockPackages = [
  {
    id: "1",
    title: "Safari Adventure",
    location: "Serengeti, Tanzania",
    price: 2499,
    duration: "7 days",
    featured: true
  },
  {
    id: "2",
    title: "Mountain Explorer",
    location: "Swiss Alps",
    price: 1899,
    duration: "5 days",
    featured: true
  },
  {
    id: "3",
    title: "Tropical Paradise",
    location: "Maldives",
    price: 3299,
    duration: "6 days",
    featured: true
  },
  {
    id: "4",
    title: "Desert Adventure",
    location: "Dubai, UAE",
    price: 1999,
    duration: "4 days",
    featured: true
  }
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState(mockBookings);
  const [packages, setPackages] = useState(mockPackages);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isEditPackageDialogOpen, setIsEditPackageDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<any>(null);

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    toast({
      title: "Status Updated",
      description: `Booking ${bookingId} status changed to ${newStatus}`,
    });
  };

  const handleEditPackage = (pkg: any) => {
    setCurrentPackage({...pkg});
    setIsEditPackageDialogOpen(true);
  };

  const handleSavePackage = () => {
    if (currentPackage) {
      if (currentPackage.id) {
        // Update existing package
        setPackages(packages.map(p => 
          p.id === currentPackage.id ? currentPackage : p
        ));
        toast({
          title: "Package Updated",
          description: `${currentPackage.title} has been updated successfully.`,
        });
      } else {
        // Add new package
        const newPackage = {
          ...currentPackage,
          id: Math.random().toString(36).substr(2, 9),
          featured: false,
        };
        setPackages([...packages, newPackage]);
        toast({
          title: "Package Created",
          description: `${currentPackage.title} has been created successfully.`,
        });
      }
      setIsEditPackageDialogOpen(false);
    }
  };

  const handleDeletePackage = (packageId: string) => {
    setPackages(packages.filter(p => p.id !== packageId));
    toast({
      title: "Package Deleted",
      description: "The package has been deleted successfully.",
    });
  };

  const handleToggleFeatured = (packageId: string) => {
    setPackages(packages.map(p => 
      p.id === packageId ? { ...p, featured: !p.featured } : p
    ));
  };

  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Booking Management</h2>
              <Button>Export CSV</Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of recent bookings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Travelers</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.packageName}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
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
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                            disabled={booking.status === 'Confirmed'}
                          >
                            Confirm
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {selectedBooking && (
              <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Booking ID</p>
                        <p>{selectedBooking.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p>{selectedBooking.status}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Package</p>
                      <p>{selectedBooking.packageName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p>{selectedBooking.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p>{selectedBooking.customerEmail}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Travel Date</p>
                        <p>{selectedBooking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Travelers</p>
                        <p>{selectedBooking.travelers}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Total Amount</p>
                      <p className="text-lg font-bold">${selectedBooking.totalAmount}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setSelectedBooking(null)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>
          
          <TabsContent value="packages" className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Package Management</h2>
              <Button onClick={() => {
                setCurrentPackage({
                  title: '',
                  location: '',
                  price: 0,
                  duration: '',
                });
                setIsEditPackageDialogOpen(true);
              }}>
                Add New Package
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of travel packages</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.title}</TableCell>
                      <TableCell>{pkg.location}</TableCell>
                      <TableCell>${pkg.price}</TableCell>
                      <TableCell>{pkg.duration}</TableCell>
                      <TableCell>
                        <button 
                          className={`w-5 h-5 rounded ${pkg.featured ? 'bg-primary' : 'bg-gray-200'}`}
                          onClick={() => handleToggleFeatured(pkg.id)}
                        ></button>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditPackage(pkg)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <Dialog open={isEditPackageDialogOpen} onOpenChange={setIsEditPackageDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{currentPackage?.id ? 'Edit Package' : 'Add New Package'}</DialogTitle>
                  <DialogDescription>
                    {currentPackage?.id ? 'Update the package details below.' : 'Fill in the package details below.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Package Title</Label>
                    <Input 
                      id="title"
                      value={currentPackage?.title || ''}
                      onChange={(e) => setCurrentPackage({...currentPackage, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={currentPackage?.location || ''}
                      onChange={(e) => setCurrentPackage({...currentPackage, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price"
                        type="number"
                        value={currentPackage?.price || ''}
                        onChange={(e) => setCurrentPackage({...currentPackage, price: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input 
                        id="duration"
                        placeholder="e.g. 7 days"
                        value={currentPackage?.duration || ''}
                        onChange={(e) => setCurrentPackage({...currentPackage, duration: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Package description..."
                      value={currentPackage?.description || ''}
                      onChange={(e) => setCurrentPackage({...currentPackage, description: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditPackageDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSavePackage}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="users" className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-lg text-gray-500">User management functionality coming soon...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-lg text-gray-500">Analytics functionality coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
