export default function ProjectTextSearch({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (items: any) => void;
}) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <label
        htmlFor="text"
        className="block min-w-32 font-medium text-gray-900"
      >
        Search by name:
      </label>
      <div className="w-1/2">
        <input
          id="projectName"
          name="projectName"
          value={searchQuery}
          type="text"
          placeholder="Start typing..."
          onInput={(e) => {
            setSearchQuery((e.target as HTMLTextAreaElement).value);
          }}
          className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-teal-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
}
