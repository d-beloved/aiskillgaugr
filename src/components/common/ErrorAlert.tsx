import { AppError } from "@/types";
import { event } from "@/utils/analytics";
import { useEffect } from "react";

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

  useEffect(() => {
    hasError();
  }, []);

  const hasError = () => {
    event({
      action: "has_error",
      category: "Error",
      label: `${window.location.pathname} - ${error.type} - ${error.message}`,
    });
  };

  return (
    <div className="alert alert-error shadow-lg mb-4 animate-slide-up bg-red-500/10 border border-red-500/20">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col">
          <span className="font-bold text-red-400">{error.message || errorMessages[error.type]}</span>
          {error.details && <span className="text-sm text-red-300">{error.details}</span>}
        </div>
      </div>
      <div className="flex-none gap-2">
        {onRetry && (
          <button onClick={onRetry} className="btn btn-ghost btn-sm hover:bg-red-500/20 text-red-400">
            Retry
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="btn btn-ghost btn-sm hover:bg-red-500/20 text-red-400">
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
