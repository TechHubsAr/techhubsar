import fs from "fs/promises";
import path from "path";
import type { Community } from "../types/community";

async function generateCommunitiesJson() {
  const dataDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "communities"
  );
  const outputPath = path.join(
    process.cwd(),
    "public",
    "data",
    "communities.json"
  );

  try {
    const fileNames = await fs.readdir(dataDirectory);

    const communities = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(dataDirectory, fileName);
        const fileContents = await fs.readFile(filePath, "utf8");
        const community = JSON.parse(fileContents) as Community;
        const slug = path.parse(fileName).name;

        return {
          id: community.id,
          slug,
          name: community.name,
          shortDescription: community.shortDescription,
          location: community.location,
          province: community.province,
          category: community.category,
        };
      })
    );

    await fs.writeFile(outputPath, JSON.stringify(communities, null, 2));
    console.log("communities.json has been generated successfully.");
  } catch (error) {
    console.error("Error generating communities.json:", error);
  }
}

generateCommunitiesJson();
