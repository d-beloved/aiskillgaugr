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
    <div className="max-sm:flex max-sm:flex-col alert alert-error justify-between justify-items-end shadow-lg mb-4 animate-slide-up bg-red-500/10 border border-red-500/20">
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 stroke-current text-red-400 animate-pulse-slow"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div className="flex flex-col">
          <span className="font-bold text-red-400">{error.message || errorMessages[error.type]}</span>
          {error.details && <span className="text-sm text-red-300">{error.details}</span>}
        </div>
      </div>
      <div className="flex gap-2">
        {onRetry && (
          <button onClick={onRetry} className="btn btn-outline btn-xs hover:bg-red-500/20 text-red-400">
            Retry
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="btn btn-outline btn-xs hover:bg-red-500/20 text-red-400">
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
