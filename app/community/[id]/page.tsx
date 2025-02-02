import { fetchCommunities } from "@/utils/fetchCommunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Twitter, Github, Linkedin } from "lucide-react";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const communities = await fetchCommunities();
  const community = communities.find((c) => c.id === params.id);

  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{community.name}</h1>
      <Badge variant="secondary" className="mb-4">
        {community.category}
      </Badge>
      <p className="text-xl mb-6">{community.fullDescription}</p>

      <div className="flex space-x-4 mb-8">
        {community.website && (
          <a href={community.website} target="_blank" rel="noopener noreferrer">
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
      </div>

      <h2 className="text-2xl font-bold mb-4">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {community.members.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                {member.github && (
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={`https://www.linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Linkedin className="h-3 w-3" />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
