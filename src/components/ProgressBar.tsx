export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute w-11/12 bottom-2 left-1/2 transform -translate-x-1/2">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
        <div
          style={{
            width: `${progress}%`,
          }}
          className="
            shadow-none
            flex flex-col
            text-center
            whitespace-nowrap
            text-white
            justify-center
            bg-purple-500
          "
        ></div>
      </div>
    </div>
  );
}
