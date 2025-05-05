import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

export default function ProjectDialog({
  children,
  open,
  onClose,
  className = ''
}: React.ComponentProps<"div"> & {
  open: boolean,
  onClose: () => void,
  className?: string
}) {
  return (
    <Dialog
      transition
      className="relative z-10"
      open={open}
      onClose={onClose}
    >
      <DialogBackdrop
        transition
        className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/25 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className={twMerge("data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in mx-auto max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all", className)}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-1 top-1 cursor-pointer place-items-center p-2 hover:text-teal-700"
          >
            <X size="18" />
          </button>
          {open && children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
