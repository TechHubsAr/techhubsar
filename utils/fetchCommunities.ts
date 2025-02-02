import type { Community } from "../types/community";
import communities from "../public/data/communities.json";
export async function fetchCommunities(): Promise<Community[]> {
  try {
    const data: Community[] = communities;
    return data;
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}
