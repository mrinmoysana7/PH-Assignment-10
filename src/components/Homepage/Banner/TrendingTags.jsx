const tags = [
  "Marketing Copy",
  "Code Generator",
  "Business Strategy",
  "Resume Builder",
  "Content Ideas",
  "AI Tools",
];

export default function TrendingTags() {
  return (
    <div className="mt-8">
      <h3 className="mb-5 font-semibold">↗ Trending Prompts</h3>

      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            className="rounded-full border border-gray-200 bg-white px-5 py-2 shadow-sm hover:border-violet-400"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
