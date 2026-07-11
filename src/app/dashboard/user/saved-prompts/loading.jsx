import SavedPromptSkeleton from "@/components/prompts/SavedPromptSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl md:py-25 lg:py-15 md:px-15  grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <SavedPromptSkeleton key={index} />
      ))}
    </div>
  );
}
