
import { SearchFilters } from "@/components/ui/SearchFilters";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { useState } from "react";
import type { UserProfile, SearchFilterOptions } from "@/types";

// Mock data for initial development
const mockProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?u=alex",
    skills: ["React", "TypeScript", "Node.js"],
    location: "San Francisco, CA",
    hackathons: ["ETH Global", "DevPost Hackathon"],
    bio: "Full stack developer passionate about Web3"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    skills: ["UI/UX", "Figma", "Frontend"],
    location: "London, UK",
    hackathons: ["Online Hackathon 2024", "Design Sprint"],
    bio: "Product designer with 3 years of experience"
  },
  // Add more mock profiles as needed
];

export default function Index() {
  const [filters, setFilters] = useState<SearchFilterOptions>({
    skills: [],
    location: "",
    hackathonType: "all"
  });

  const handleMessageClick = (profileId: string) => {
    // Implement messaging functionality
    console.log("Message clicked for profile:", profileId);
  };

  // Filter profiles based on search criteria
  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.every(skill => 
        profile.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );

    const matchesLocation = !filters.location ||
      profile.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSkills && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Hackathon Teammate Finder
          </h1>
          <p className="mt-2 text-gray-600">
            Find the perfect teammates for your next hackathon
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <SearchFilters onFilterChange={setFilters} />
          </aside>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onMessageClick={handleMessageClick}
                />
              ))}
            </div>

            {filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No matches found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
