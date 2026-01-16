import { Metadata } from "next";
import { WeatherDemoContent } from "../_components/weather-demo";
import { ComponentPreview } from "@/app/docs/_components/component-preview";
import { getExampleSource } from "@/lib/get-example-source";

export const metadata: Metadata = {
  title: "Weather Example",
  description: "Real-time weather data visualization with Terrae",
};

export default function WeatherExamplePage() {
  const exampleSource = getExampleSource("weather-demo-example.tsx");

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-2">Real-Time Weather</h1>
      <p className="text-muted-foreground text-lg mb-12">
        Live weather data visualization across major cities around the world using the free Open-Meteo API.
      </p>
      
      <ComponentPreview code={exampleSource} className="h-[600px]">
        <WeatherDemoContent />
      </ComponentPreview>
    </>
  );
}
