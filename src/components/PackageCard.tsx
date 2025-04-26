
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PackageCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  image: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  id,
  title,
  location,
  price,
  duration,
  image,
}) => {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-primary font-bold">${price}</span>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/package/${id}`} className="w-full">
          <Button className="w-full" variant="secondary">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
