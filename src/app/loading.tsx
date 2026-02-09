
export default function LoadingSpinner() {
  return (
    <div
      className="flex h-screen items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="sr-only">Loading…</span>

      <div
        className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"
        aria-hidden="true"
      />
    </div>
  );
}