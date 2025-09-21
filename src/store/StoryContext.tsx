import { createContext, useState } from "react";
import type { ReactNode } from "react";

export type StoryData = {
  name: string;
  age: string;
  theme: string;
  subject: string;
  atmosphere: string;
  characters: string;
  length: string;
};


type StoryContextType = {
  storyData: StoryData;
  updateData: (key: keyof StoryData, value: string) => void;
  storyOutput: string;
  generateStory: () => Promise<void>;
};

export const StoryContext = createContext<StoryContextType | undefined>(undefined);

type StoryProviderProps = {
  children: ReactNode;
};


export const StoryProvider = ({ children }: StoryProviderProps) => {
  const [storyData, setStoryData] = useState<StoryData>({
    name: "",
    age: "",
    theme: "",
    subject: "",
    atmosphere: "",
    characters: "",
    length: "",
  });
  const [storyOutput, setStoryOutput] = useState<string>("");

  const updateData = (key: keyof StoryData, value: string) => {
    setStoryData((prev) => ({ ...prev, [key]: value }));
  };

  const buildPrompt = () => {
    return `Write a ${storyData.length} bedtime story for a child named ${storyData.name} (${storyData.age} years old). 
      The story should start immediately, as if the reader is stepping into a magical and enchanting world. 
      Theme: ${storyData.theme}
      Subject: ${storyData.subject}
      Atmosphere: ${storyData.atmosphere}
      Supporting Characters: ${storyData.characters}

      Requirements:
      1. Make the story highly imaginative, whimsical, and age-appropriate, with vivid sensory details (sight, sound, smell, touch, taste) that immerse the child into the world.
      2. Include engaging dialogue that reflects the personalities of the characters and encourages emotional connection.
      3. Structure the story with a clear beginning, middle, and satisfying ending, while maintaining a gentle and calming tone suitable for bedtime.
      4. Introduce small, magical adventures, surprises, or gentle conflicts that are resolved positively.
      5. Include moments of humor, wonder, or lessons about kindness, friendship, courage, or curiosity.
      6. Use descriptive language to create visual images, sounds, and emotions that capture the child’s imagination.
      7. Occasionally address the child directly or make them feel part of the story to increase engagement.
      8. End the story with a soft, soothing conclusion, leaving the child feeling safe, happy, and ready to sleep.
      9. Keep paragraphs short and sentences clear, making it easy for reading aloud.

      Generate the story in full, making it magical, immersive, and memorable for ${storyData.name}.`;
  };

  const generateStory = async () => {
    const prompt = buildPrompt();
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      const story = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No story generated.";
      const cleanStory = story.replace(/[*_~`]/g, "");
      setStoryOutput(cleanStory);

      try {
        const prevStories = JSON.parse(localStorage.getItem('stories') || '[]');
        const newStory = {
          date: new Date().toISOString(),
          prompt,
          story,
          form: { ...storyData }
        };
        localStorage.setItem('stories', JSON.stringify([...prevStories, newStory]));
      } catch (e) {
      }
    } catch (err) {
      setStoryOutput("Error generating story.");
    }
  };

  return (
    <StoryContext.Provider value={{ storyData, updateData, storyOutput, generateStory }}>
      {children}
    </StoryContext.Provider>
  );
};