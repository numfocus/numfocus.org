import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { X } from 'lucide-react';

import type { Project } from 'env';
import ProjectDialogContent from './ProjectExpandedContent';


export default function ProjectDialog({
  project,
  onClose
}: {
  project?: Project,
  onClose: () => void
}) {
  return (
    <Dialog
      transition
      className="relative z-10"
      open={!!project}
      onClose={onClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/25 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-4xl transform overflow-hidden rounded-xl bg-white ring-1 shadow-2xl ring-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        >
          <button onClick={onClose} className="absolute right-1 top-1 cursor-pointer place-items-center p-2 hover:text-teal-700">
            <X size="18" />
          </button>
          {!!project && <ProjectDialogContent project={project} />}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
