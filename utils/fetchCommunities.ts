import type { Community } from "../types/community";
import communities from "../public/data/communities.json";
import path from "path";
import { promises as fs } from 'fs';

export async function fetchCommunities(): Promise<Community[]> {
  try {
    const data: Community[] = communities;
    return data;
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}

export async function fetchCommunityBySlug(
  slug: string
): Promise<Community | null> {
  if (!slug) {
    console.error("Error: slug is undefined or empty");
    return null; 
  }

  try {
    const dataDirectory = path.join(process.cwd(), "public", "data", "communities");
    const filePath = path.join(dataDirectory, `${slug}.json`);
    
    const fileExists = await fs.stat(filePath).catch(() => false);
    if (!fileExists) {
      console.error(`Error: File for community with slug ${slug} does not exist`);
      return null;
    }

    const fileContents = await fs.readFile(filePath, "utf8");
    const community = JSON.parse(fileContents) as Community;
    community.slug = slug;
    return community;
  } catch (error) {
    console.error(`Error fetching community with slug ${slug}:`, error);
    return null;
  }
}
