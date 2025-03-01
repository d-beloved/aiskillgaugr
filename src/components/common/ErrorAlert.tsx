import { AppError } from "@/types";

interface Props {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorAlert({ error, onRetry, onDismiss }: Props) {
  const errorMessages = {
    SESSION_EXPIRED: "Your session has expired. Please start a new quiz.",
    CACHE_ERROR: "There was an error loading saved questions.",
    API_ERROR: "Failed to generate new questions.",
    NETWORK_ERROR: "Please check your internet connection.",
  };

  return (
    <div className="alert alert-error shadow-lg mb-4 animate-fade-in">
      <div className="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col">
          <span className="text-sm opacity-90">{error.message || errorMessages[error.type]}</span>
          {error.details && <span className="text-xs opacity-75">{error.details}</span>}
        </div>
      </div>
      <div className="flex-none gap-2">
        {onRetry && (
          <button onClick={onRetry} className="btn btn-ghost btn-sm normal-case">
            Retry
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="btn btn-ghost btn-sm normal-case">
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
