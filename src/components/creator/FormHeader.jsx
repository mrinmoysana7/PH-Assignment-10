export default function FormHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight ">
        Create New Prompt Template
      </h1>

      <p className="text-sm text-slate-400">
        Fill in the details below to submit your AI prompt to the marketplace.
        After submission, your prompt will be reviewed by an administrator
        before becoming publicly available.
      </p>
    </div>
  );
}
