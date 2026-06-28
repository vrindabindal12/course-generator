import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function LoadingDialog({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(interval);
            return 98;
          }
          // Increment incrementally (slowing down as we get closer to completion)
          const increment = prev < 40 ? 4 : prev < 75 ? 2 : 1;
          return prev + increment;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const getProgressLabel = (val) => {
    if (val < 25) return "Analyzing category & topic...";
    if (val < 55) return "Structuring curriculum chapters...";
    if (val < 85) return "Generating instructional notes...";
    return "Saving workspace layout...";
  };

  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent className="bg-black/95 backdrop-blur-md border border-neutral-900 rounded-2xl max-w-sm mx-auto shadow-2xl shadow-black/95">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <VisuallyHidden>Loading Dialog</VisuallyHidden>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="flex flex-col items-center py-8">
                {/* Custom Interactive Spinning/Pulsing Spinner */}
                <div className="relative w-16 h-16 mb-4 select-none">
                  {/* Outer spinning gradient ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  {/* Inner glowing pulsing orb */}
                  <div className="absolute inset-2 rounded-full bg-primary/5 border border-primary/30 animate-pulse flex items-center justify-center">
                    <span className="text-lg font-mono font-bold text-primary select-none">*</span>
                  </div>
                </div>
                
                <h3 className="text-[#E1E0CC] font-semibold text-base text-center mt-2">
                  Please wait... <span className="font-serif italic text-primary font-normal">Prisma</span> is crafting your course
                </h3>
                <p className="text-neutral-500 text-xs mt-2 text-center max-w-[240px] leading-relaxed select-none">
                  Gathering context, structuring chapters, and assembling custom learning modules.
                </p>

                {/* Progress Bar Wrapper */}
                <div className="w-full mt-6 px-2 select-none">
                  <div className="w-full bg-neutral-900 border border-neutral-850 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center w-full mt-2 text-[10px] text-neutral-500 font-mono">
                    <span className="animate-pulse">{getProgressLabel(progress)}</span>
                    <span className="font-semibold text-neutral-400">{progress}%</span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LoadingDialog;
