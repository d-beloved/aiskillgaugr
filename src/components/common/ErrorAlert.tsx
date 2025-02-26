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
    <div role="alert" className="alert alert-error">
      <span>{errorMessages[error.type] || error.message}</span>
      <div>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-sm">
            Try Again
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="btn btn-sm">
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
