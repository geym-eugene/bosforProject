import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import { HouseScene } from "./HouseScene";

interface Modal3DProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Modal3D: React.FC<Modal3DProps> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl w-full h-[80vh] bg-white p-0 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full">
              <Loader className="w-12 h-12 animate-spin text-gray-400" />
            </div>
          }
        >
          <HouseScene />
        </Suspense>
      </div>
    </DialogContent>
  </Dialog>
);
