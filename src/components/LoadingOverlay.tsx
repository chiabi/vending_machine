import React, { useEffect, useId, useState, useTransition } from 'react';

interface LoadingOverlayProps {
  progress: number;
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  progress,
  isLoading,
}) => {
  const id = useId();
  const [_, startTransition] = useTransition();
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      startTransition(() => {
        setTimeout(() => setShow(false), 350);
      });
    } else {
      setShow(true);
    }
  }, [isLoading]);

  if (!show) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 w-screen h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-yellow-950 transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="w-1/3 flex flex-col items-center gap-4">
        <div
          className="w-full rounded-full h-2.5 bg-gray-700 overflow-hidden"
          role="progressbar"
        >
          <div
            className="w-full h-2.5 rounded-full bg-gradient-to-r from-yellow-700 to-yellow-200 transition-transform"
            style={{ transform: `translateX(${progress - 100}%)` }}
            aria-valuenow={progress}
            aria-labelledby={id}
          />
        </div>
        <div id={id} className="font-bold text-white">
          Loading...
        </div>
      </div>
    </div>
  );
};
