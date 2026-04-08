import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ELEVATE PNW Volleyball Club",
    short_name: "ELEVATE PNW",
    description:
      "A mobile-friendly volleyball club platform for players, parents, coaches, and admins.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
  };
}
