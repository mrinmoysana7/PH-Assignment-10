import SavedPromptSkeleton from "@/components/prompts/SavedPromptSkeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <SavedPromptSkeleton key={index} />
      ))}
    </div>
  );
}
