type SpinnerProps = {
  size: "sm" | "md" | "lg";
  message?: string;
};

function Spinner({ size, message }: SpinnerProps) {
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
