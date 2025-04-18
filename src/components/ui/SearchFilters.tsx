
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { SearchFilterOptions } from "@/types";

interface FilterProps {
  onFilterChange: (filters: SearchFilterOptions) => void;
}

export function SearchFilters({ onFilterChange }: FilterProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [location, setLocation] = useState("");
  const [hackathonType, setHackathonType] = useState<'all' | 'online' | 'in-person'>('all');

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      setSkillInput("");
      onFilterChange({ skills: newSkills, location, hackathonType });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    onFilterChange({ skills: newSkills, location, hackathonType });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Skills</label>
        <Input
          placeholder="Add skills (press Enter)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleAddSkill}
          className="w-full"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-2 py-1">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <Input
          placeholder="City or Country"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            onFilterChange({ skills, location: e.target.value, hackathonType });
          }}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Hackathon Type</label>
        <Select
          value={hackathonType}
          onValueChange={(value: 'all' | 'online' | 'in-person') => {
            setHackathonType(value);
            onFilterChange({ skills, location, hackathonType: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="in-person">In-Person</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
