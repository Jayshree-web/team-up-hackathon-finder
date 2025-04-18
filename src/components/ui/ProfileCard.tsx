
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, MapPin } from "lucide-react";
import { UserProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  profile: UserProfile;
  onMessageClick: (profileId: string) => void;
}

export function ProfileCard({ profile, onMessageClick }: ProfileCardProps) {
  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            {profile.location}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Interested Hackathons</h4>
            <div className="flex flex-wrap gap-2">
              {profile.hackathons.map((hackathon) => (
                <Badge key={hackathon} variant="outline">
                  {hackathon}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              className="w-full"
              onClick={() => onMessageClick(profile.id)}
              variant="default"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
