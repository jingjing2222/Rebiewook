// src/services/api.ts
const API_BASE_URL =
  "https://tstnssgozphknyeryvtq.supabase.co/functions/v1/api";

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzdG5zc2dvenBoa255ZXJ5dnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNDk4MTgsImV4cCI6MjA1MjkyNTgxOH0.ETH7zFCQD-LxiV_9UcyVX4eHgjbv8z3kXgMs1pJ20j0";

const headers = {
  apikey: ANON_KEY,
  "Content-Type": "application/json",
};

export async function getReviews(page = 0, order = "published_date") {
  const response = await fetch(
    `${API_BASE_URL}/reviews?page=${page}&order=${order}`,
    {
      headers,
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
}
