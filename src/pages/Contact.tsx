
import React from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    // In a real app, this would send data to a backend API
    console.log(values);
    
    toast({
      title: "Message Sent!",
      description: "We've received your message and will respond shortly.",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen bg-sage-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?ixlib=rb-4.0.3")'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Have questions or need assistance? We're here to help you plan your next adventure.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-8 text-gray-700">
              Whether you have questions about our travel packages, need assistance with booking, or want to customize your journey, our team is ready to assist you. Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Our Office</h3>
                  <p className="text-gray-700">123 Adventure Street, Explorer City, Country</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">✉️</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-700">info@bushblazers.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Inquiry about Safari Adventure" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I'm interested in booking the Safari Adventure package for a family of 4 in July..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
          <div className="h-[400px] bg-gray-300 rounded-lg overflow-hidden">
            {/* Placeholder for a map */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Map would be displayed here in a real application</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">How far in advance should I book my trip?</h3>
            <p className="text-gray-700">We recommend booking at least 3-6 months in advance for most destinations, especially during peak travel seasons. However, last-minute bookings are sometimes available.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-700">We accept all major credit cards, bank transfers, and PayPal. For certain destinations, a deposit is required at the time of booking with the balance due 60 days before departure.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">Are your trips suitable for children?</h3>
            <p className="text-gray-700">Many of our trips are family-friendly, but age recommendations vary by destination and activities. Please check the specific package details or contact us directly to discuss your family's needs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">What is your cancellation policy?</h3>
            <p className="text-gray-700">Our standard policy allows full refunds for cancellations made 90 days or more before departure, 50% refund for 60-89 days, and no refund for less than 60 days. We recommend purchasing travel insurance.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
