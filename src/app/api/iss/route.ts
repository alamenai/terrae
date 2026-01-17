import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch("http://api.open-notify.org/iss-now.json", {
      signal: controller.signal,
      cache: "no-store",
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`ISS API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.iss_position) {
      throw new Error("Invalid response from ISS API");
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("ISS API Error:", error);
    
    // Return error response
    return NextResponse.json(
      { error: "Failed to fetch ISS position", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
