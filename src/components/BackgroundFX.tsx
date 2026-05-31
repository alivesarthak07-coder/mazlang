export function BackgroundFX() {
  return (
    <>
      {/* Animated radial gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[120px] float-slow" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[140px] float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-700/20 blur-[100px] float-slow" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none z-0" />

      {/* Vignette */}
      <div className="fixed inset-0 vignette pointer-events-none z-0" />
    </>
  );
}
