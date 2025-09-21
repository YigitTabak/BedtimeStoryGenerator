import { useEffect, useState } from "react";
import "./Archive.css";

type ArchiveStory = {
  date: string;
  prompt: string;
  story: string;
  form: {
    name: string;
    age: string;
    theme: string;
    subject: string;
    atmosphere: string;
    characters: string;
    length: string;
  };
};

export const Archive = () => {
  const [stories, setStories] = useState<ArchiveStory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stories");
    if (stored) {
      try {
        setStories(JSON.parse(stored));
      } catch {
        setStories([]);
      }
    }
  }, []);

  return (
    <>
      <h1 className="archive-title">Archive</h1>
      <div className="archive-container">
        {stories.length === 0 ? (
          <div className="archive-box">
            <p>No stories found in archive.</p>
          </div>
        ) : (
          stories
            .slice()
            .reverse()
            .map((item, idx) => (
              <div className="archive-box" key={item.date + idx}>
                <p>
                  <strong>✨</strong>
                  <br />
                  {item.story}
                </p>
              </div>
            ))
        )}
      </div>
    </>
  );
};