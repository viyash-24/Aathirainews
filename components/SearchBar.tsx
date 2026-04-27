export default function SearchBar() {
  return (
    <div className="hidden sm:flex items-center bg-surface-container-low border border-outline-variant px-3 py-1 rounded">
      <span className="material-symbols-outlined text-sm text-outline mr-2">
        search
      </span>
      <input
        className="bg-transparent border-none focus:ring-0 text-sm font-[Mukta_Malar] outline-none"
        placeholder="தேடல்..."
        type="text"
      />
    </div>
  );
}
