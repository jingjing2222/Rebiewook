import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const functionName = "api";
const app = new Hono().basePath(`/${functionName}`);

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://rebiewook.site",
      "https://jingjing2222.github.io",
    ],
    allowHeaders: ["Content-Type", "Authorization", "apikey"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.get("/ping", (c) => {
  return c.json({ message: "API is working!" });
});

app.get("/reviews", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "0");
    const order = c.req.query("order") || "published_date";

    const { data, error } = await supabase.rpc("get_reviews", {
      page_num: page,
      order_by: order,
    });

    if (error) {
      throw new Error(error.message);
    }

    return c.json(data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return c.json({ error: "Failed to fetch reviews" }, 500);
  }
});

Deno.serve(app.fetch);
