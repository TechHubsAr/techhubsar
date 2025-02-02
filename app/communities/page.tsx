"use client";

import { useState, useEffect } from "react";
import { fetchCommunities } from "@/utils/fetchCommunities";
import type { Community } from "@/types/community";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Globe, Twitter } from "lucide-react";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(
    []
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");

  useEffect(() => {
    const loadCommunities = async () => {
      const fetchedCommunities = await fetchCommunities();
      setCommunities(fetchedCommunities);
      setFilteredCommunities(fetchedCommunities);

      const uniqueCategories = Array.from(
        new Set(fetchedCommunities.map((c) => c.category))
      );
      setCategories(["all", ...uniqueCategories]);

      const uniqueProvinces = Array.from(
        new Set(fetchedCommunities.map((c) => c.province))
      );
      setProvinces(["all", ...uniqueProvinces]);
    };
    loadCommunities();
  }, []);

  useEffect(() => {
    let filtered = communities;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }
    if (selectedProvince !== "all") {
      filtered = filtered.filter((c) => c.province === selectedProvince);
    }
    setFilteredCommunities(filtered);
  }, [selectedCategory, selectedProvince, communities]);

  return (
    <div className='container mx-auto px-4 py-12 max-w-7xl'>
      <h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
        Tech Communities in Argentina
      </h1>

      <div className='bg-background/50 backdrop-blur-sm border border-border/50 shadow-xl rounded-xl p-8'>
        {/* Filters section */}
        <div className='mb-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <Tabs
            defaultValue='all'
            className='w-full md:w-[400px]'
            onValueChange={setSelectedCategory}
          >
            <TabsList className='w-full'>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className='flex-1'>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Select onValueChange={setSelectedProvince}>
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Select a province' />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Communities grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCommunities.map((community) => (
            <Card
              key={community.id}
              className='hover:shadow-xl transition-shadow duration-200'
            >
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  {community.name}
                </CardTitle>
                <CardDescription className='text-muted-foreground/80 text-base min-h-[2rem]'>
                  {community.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <Badge
                    variant='secondary'
                    className='px-4 py-1 rounded-full bg-accent/10 hover:bg-accent/20 text-foreground font-medium'
                  >
                    {community.category}
                  </Badge>
                  <div className='flex gap-2'>
                    {community.website && (
                      <a
                        href={community.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:opacity-80 transition-opacity'
                      >
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full'
                        >
                          <Globe className='h-4 w-4' />
                        </Button>
                      </a>
                    )}
                    {community.twitter && (
                      <a
                        href={`https://twitter.com/${community.twitter}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:opacity-80 transition-opacity'
                      >
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full'
                        >
                          <Twitter className='h-4 w-4' />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
                <Link
                  href={`/community/${community.id}`}
                  className='inline-block text-primary hover:underline font-medium'
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
