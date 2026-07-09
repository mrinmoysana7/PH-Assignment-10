"use client";

import SavedPromptCard from "./SavedPromptCard";

export default function SavedPromptsGrid({ prompts, user }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {prompts.map((prompt) => (
        <SavedPromptCard key={prompt._id} prompt={prompt} user={user} />
      ))}
    </div>
  );
}
