const InProgressTag = () => {
  return (
    <section className="flex items-center gap-1">
      <div className="flex items-center gap-2 rounded-full bg-green-200 px-2 py-px text-xs text-green-700">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        in progress
      </div>
    </section>
  );
};

export default InProgressTag;
