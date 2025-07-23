export default function ProjectTextSearch({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (items: any) => void;
}) {
  return (
    <div className="w-full">
      <input
        id="projectName"
        name="projectName"
        value={searchQuery}
        type="text"
        placeholder="Start typing..."
        onInput={(e) => {
          setSearchQuery((e.target as HTMLTextAreaElement).value);
        }}
        className="outline-brand-link block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
      />
    </div>
  );
}
