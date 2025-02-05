import { fetchCommunities } from "@/utils/fetchCommunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  Send,
  MessageSquare,
  MapPin,
} from "lucide-react";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const communities = await fetchCommunities();
  const community = communities.find((c) => c.id === params.id);

  if (!community) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-2xl font-bold text-red-500">
          Community not found
        </div>
      </div>
    );
  }

  // Create a sorted copy of the members by name (alphabetical order)
  const sortedMembers = community.members
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-end text-sm text-muted-foreground mb-4">
          <h1 className="text-5xl font-extrabold  ">{community.name}</h1>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 " />
            <span className=" ">{community.province}</span>
          </div>
        </div>

        <Badge variant="secondary" className="mb-4 text-lg px-3 py-1">
          {community.category}
        </Badge>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="max-w-2xl w-full  ">
            <h2 className="text-xl font-bold "> Description</h2>
            <p className="text-xl max-w-2xl w-full  ">
              {community.fullDescription}
            </p>
          </div>
          <div className="max-w-lg w-full flex flex-col gap-4">
            <h2 className="text-xl font-bold "> Socials</h2>
            {community.website && (
              <a
                href={community.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Globe className="mr-2 h-4 w-4" />
                  Website
                </Button>
              </a>
            )}
            {community.twitter && (
              <a
                href={`https://twitter.com/${community.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </a>
            )}
            {community.whatsapp && (
              <a
                href={community.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <MessageCircle className="h-4 w-4" /> Whatsapp
                </Button>
              </a>
            )}
            {community.telegram && (
              <a
                href={community.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Send className="h-4 w-4" /> Telegram
                </Button>
              </a>
            )}
            {community.discord && (
              <a
                href={community.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <MessageSquare className="h-4 w-4" /> Discord
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Members Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMembers.map((member, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold ">
                  {member.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-2">
                {member.github && (
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-blue-600"
                  >
                    <Button variant="outline" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-blue-400"
                  >
                    <Button variant="outline" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={`https://www.linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-blue-700"
                  >
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
