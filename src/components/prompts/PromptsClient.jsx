"use client";

import { useMemo, useState } from "react";

import PromptCard from "../ui/PromptCard";
import PromptFilter from "./PromptFilter";

export default function PromptsClient({ prompts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tool, setTool] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        prompt.promptTitle.toLowerCase().includes(keyword) ||
        prompt.fullDescription.toLowerCase().includes(keyword) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(keyword));

      const matchesCategory =
        category === "all" || prompt.category === category;

      const matchesTool = tool === "all" || prompt.aiToolName === tool;

      const matchesDifficulty =
        difficulty === "all" || prompt.difficultyLevel === difficulty;

      return (
        matchesSearch && matchesCategory && matchesTool && matchesDifficulty
      );
    });
  }, [prompts, search, category, tool, difficulty]);

  return (
    <div className="px-5 md:px-10 pt-30 pb-15 bg-[#fafafa]">
      <div className="container space-y-8 mx-auto">
        <PromptFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          tool={tool}
          setTool={setTool}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          prompts={prompts}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
