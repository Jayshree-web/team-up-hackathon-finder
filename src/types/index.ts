
export interface SearchFilterOptions {
  skills: string[];
  location: string;
  hackathonType: 'all' | 'online' | 'in-person';
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  location: string;
  hackathons: string[];
  bio: string;
}
