'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaceFrownIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import type { Project } from 'env';

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
      onClose={() => {
        console.log('closing')
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/25 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white ring-1 shadow-2xl ring-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        >
          TEST
        </DialogPanel>
      </div>
    </Dialog>
  );
}
