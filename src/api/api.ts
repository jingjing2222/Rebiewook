const API_BASE_URL =
  "https://tstnssgozphknyeryvtq.supabase.co/functions/v1/api";
const headers = {
  "Content-Type": "application/json",
};

export async function getReviews(page = 0, order = "published_date") {
  const url = new URL(`${API_BASE_URL}/reviews`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("order", order);

  const response = await fetch(url.toString(), {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
}
