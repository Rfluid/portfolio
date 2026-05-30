/**
 * Decorative animated background: floating gradient blobs + a subtle grid.
 * Pointer-events disabled so it never interferes with the UI.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Blobs */}
      <div className="animate-blob absolute -left-32 top-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-1/30 blur-[100px] dark:bg-brand-1/20" />
      <div className="animate-blob absolute right-[-10%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-brand-3/25 blur-[110px] [animation-delay:-6s] dark:bg-brand-3/15" />
      <div className="animate-blob absolute bottom-[-15%] left-[30%] h-[26rem] w-[26rem] rounded-full bg-brand-2/25 blur-[100px] [animation-delay:-12s] dark:bg-brand-2/15" />
    </div>
  );
}
