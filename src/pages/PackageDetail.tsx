
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
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

// Example packages data (in a real app, this would come from an API)
const allPackages = [
  {
    id: "1",
    title: "Safari Adventure",
    location: "Serengeti, Tanzania",
    price: 2499,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3",
    description: "Experience the thrill of seeing Africa's magnificent wildlife in their natural habitat. This safari adventure takes you through the heart of Serengeti National Park, home to the Big Five and the annual wildebeest migration.",
    highlights: [
      "Game drives to spot the Big Five",
      "Visit to a Maasai village",
      "Witness the great migration (seasonal)",
      "Luxury tented camp accommodations",
      "Professional wildlife guides"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro Airport, transfer to hotel in Arusha for overnight stay."
      },
      {
        day: 2,
        title: "Transfer to Serengeti",
        description: "Morning flight to Serengeti, afternoon game drive, overnight at tented camp."
      },
      {
        day: 3,
        title: "Full Day Game Drive",
        description: "Full day exploring Serengeti, searching for lions, elephants, giraffes and more."
      },
      {
        day: 4,
        title: "Ngorongoro Crater",
        description: "Travel to Ngorongoro Crater for a day of wildlife viewing in this natural wonder."
      },
      {
        day: 5,
        title: "Cultural Experience",
        description: "Visit a local Maasai village to learn about their traditions and way of life."
      },
      {
        day: 6,
        title: "Lake Manyara",
        description: "Explore Lake Manyara National Park, famous for its tree-climbing lions."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer back to Arusha, last-minute shopping, and departure."
      }
    ],
    included: [
      "All accommodations (6 nights)",
      "All meals as specified in the itinerary",
      "Professional English-speaking guides",
      "Park entrance fees",
      "Game drives and activities as mentioned",
      "All ground transportation",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Gratuities for guides and staff",
      "Optional activities"
    ],
    reviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Absolutely incredible experience! We saw all the Big Five and our guide was extremely knowledgeable."
      },
      {
        name: "Sarah M.",
        rating: 4,
        comment: "Great trip overall. The accommodations were comfortable and the wildlife viewing was spectacular."
      }
    ]
  },
  // More packages would be here...
  {
    id: "2",
    title: "Mountain Explorer",
    location: "Swiss Alps",
    price: 1899,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3",
    description: "Explore the majestic Swiss Alps with experienced mountain guides. This package offers breathtaking views, challenging hikes, and comfortable accommodations in traditional mountain chalets.",
    highlights: [
      "Daily guided hikes through scenic trails",
      "Cable car ride to Schilthorn summit",
      "Visit to traditional Alpine villages",
      "Swiss cheese and chocolate tasting",
      "Mountain chalet accommodations"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich",
        description: "Arrive in Zurich, transfer to Interlaken, welcome dinner."
      },
      {
        day: 2,
        title: "Grindelwald & First",
        description: "Hiking in the Grindelwald area, cable car to First, optional cliff walk."
      },
      {
        day: 3,
        title: "Lauterbrunnen Valley",
        description: "Explore the valley of 72 waterfalls, visit Trümmelbach Falls."
      },
      {
        day: 4,
        title: "Schilthorn Peak",
        description: "Cable car to Schilthorn peak, spectacular views, visit the Piz Gloria restaurant."
      },
      {
        day: 5,
        title: "Departure",
        description: "Final morning hike, transfer back to Zurich for departure."
      }
    ],
    included: [
      "All accommodations (4 nights)",
      "Breakfast and dinner daily",
      "Professional mountain guides",
      "All ground transportation",
      "Cable car passes",
      "Tasting experiences",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Lunch meals",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    reviews: [
      {
        name: "Michael R.",
        rating: 5,
        comment: "Spectacular scenery and the guides were excellent. The hikes were challenging but very rewarding."
      },
      {
        name: "Lisa T.",
        rating: 5,
        comment: "Beautiful accommodations and well-organized itinerary. Loved every minute of this trip!"
      }
    ]
  }
];

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [travelers, setTravelers] = useState(1);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  useEffect(() => {
    const pkg = allPackages.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
    } else {
      navigate('/packages');
      toast({
        title: "Package Not Found",
        description: "The package you're looking for doesn't exist.",
        variant: "destructive",
      });
    }
  }, [id, navigate, toast]);

  const handleBookNow = () => {
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a travel date before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsBookingDialogOpen(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Booking Request Submitted",
      description: `Your ${selectedPackage?.title} booking for ${travelers} traveler(s) on ${selectedDate?.toDateString()} has been received.`,
    });
    setIsBookingDialogOpen(false);
    // In a real app, this would submit to a backend API
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-sage-light">
        <Navbar />
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-cover bg-center" style={{
        backgroundImage: `url(${selectedPackage.image})`
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="bg-black/50 p-6 max-w-2xl rounded-lg">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {selectedPackage.title}
            </h1>
            <p className="text-xl text-white/80 mb-4">
              {selectedPackage.location}
            </p>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl">${selectedPackage.price}</span>
                <span>per person</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{selectedPackage.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-gray-700 text-lg">{selectedPackage.description}</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedPackage.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="text-gray-700">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary">
                <h2 className="text-2xl font-bold mb-6">Your Journey</h2>
                <div className="space-y-8">
                  {selectedPackage.itinerary.map((day: any, index: number) => (
                    <div key={index} className="border-l-4 border-primary pl-4 pb-8 relative">
                      <div className="absolute w-6 h-6 bg-primary rounded-full -left-[14px] flex items-center justify-center text-white text-xs font-bold">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-bold">{day.title}</h3>
                      <p className="text-gray-700 mt-2">{day.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="inclusions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedPackage.included.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      {selectedPackage.excluded.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <div className="space-y-6">
                  {selectedPackage.reviews.map((review: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center mb-2">
                        <div className="font-bold">{review.name}</div>
                        <div className="ml-auto flex">
                          {Array.from({length: 5}, (_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                          ))}
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Booking Widget */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Book This Package</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={{before: new Date()}}
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Number of Travelers</h3>
                  <div className="flex items-center">
                    <Button 
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      variant="outline"
                      size="icon"
                    >
                      -
                    </Button>
                    <span className="mx-4 text-xl font-bold w-8 text-center">{travelers}</span>
                    <Button 
                      onClick={() => setTravelers(Math.min(10, travelers + 1))}
                      variant="outline"
                      size="icon"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Base Price (per person):</span>
                    <span className="font-semibold">${selectedPackage.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Travelers:</span>
                    <span className="font-semibold">× {travelers}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>${(selectedPackage.price * travelers).toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  No payment required now. We'll contact you to confirm availability and process payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              Review your booking details and provide your information to complete the booking process.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-bold">{selectedPackage.title}</h3>
              <p>{selectedPackage.location}</p>
              <p>Date: {selectedDate?.toDateString()}</p>
              <p>Travelers: {travelers}</p>
              <p className="font-bold pt-2">Total: ${(selectedPackage.price * travelers).toLocaleString()}</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="johndoe@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests</Label>
                <Input id="special-requests" placeholder="Any special requirements or requests" />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PackageDetail;
