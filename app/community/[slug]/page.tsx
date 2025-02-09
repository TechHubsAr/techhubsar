import { fetchCommunityBySlug } from "@/utils/fetchCommunities";
import CommunityContent from "./CommunityContent";

export default async function CommunityPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const community = await fetchCommunityBySlug(slug);
  if (!community) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-2xl font-bold text-red-500">
          Community not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <CommunityContent community={community} />
    </div>
  );
}
