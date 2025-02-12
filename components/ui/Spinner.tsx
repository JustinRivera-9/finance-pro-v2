type SpinnerProps = {
  size: "sm" | "md" | "lg";
  message?: string;
  orientation?: "horizontal" | "vertical";
};

function Spinner({ size, message, orientation = "vertical" }: SpinnerProps) {
  let spinnerHeight;
  let textHeight;
  switch (size) {
    case "sm":
      spinnerHeight = "4";
      textHeight = "sm";
      break;
    case "md":
      spinnerHeight = "8";
      textHeight = "md";
      break;
    case "lg":
      spinnerHeight = "11";
      textHeight = "lg";
      break;
  }

  if (orientation === "horizontal") {
    return (
      <div className="flex w-full justify-center items-center gap-4">
        <div
          className={`animate-spin rounded-full h-${spinnerHeight} w-${spinnerHeight} border-t-2 border-dark border-solid`}
        ></div>
        {message && (
          <p className={`text-${textHeight} text-dark font-bold`}>{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div
        className={`animate-spin rounded-full h-${spinnerHeight} w-${spinnerHeight} border-t-2 border-accent border-solid`}
      ></div>
      {message && (
        <p className={`text-${textHeight} text-light/70`}>{message}</p>
      )}
    </div>
  );
}

export default Spinner;
