// lib/fetchMediumPosts.js

import axios from "axios";

export const fetchMediumPosts = async () => {
  const MEDIUM_RSS_FEED =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@githumbi74";

  try {
    const response = await axios.get(MEDIUM_RSS_FEED);
    return response.data.items; // Items contain the array of posts
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
};
