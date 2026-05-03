export default function FAB() {
  return (
    <button
      className="fixed bottom-8 right-8 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
      aria-label="Open chat"
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        chat
      </span>
    </button>
  );
}
