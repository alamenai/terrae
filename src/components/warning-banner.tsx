export function WarningBanner() {
  return (
    <div className="relative z-50 w-full bg-linear-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-b border-amber-500/30 px-6 py-3">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
          ⚠️ <span className="font-semibold">Early Stage Project:</span> This library is not production-ready yet. Developers should use it with caution and expect breaking changes.
        </p>
      </div>
    </div>
  );
}
