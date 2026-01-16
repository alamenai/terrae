import { Metadata } from "next";
import { Story } from "./_components/story";

export const metadata: Metadata = {
  title: "Story",
  description: "The story behind Terrae - why it was built and what problems it solves",
};

export default function StoryPage() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-2">The Story Behind Terrae</h1>
      <p className="text-muted-foreground text-lg mb-8">Why I built this library and what problems it solves</p>
      <Story />
    </>
  );
}
