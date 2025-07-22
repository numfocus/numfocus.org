import Button from '@components/Atoms/Button';
import type { ButtonType } from 'env';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const donateButton: ButtonType = {
  link: { text: 'Donate', slug: 'support/donate', type_of_link: 'internal' },
  variant: 'special',
  style: 'light',
};

export default function DonateButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="text-md text-brand-orange border-brand-orange group inline-flex min-w-24 cursor-pointer flex-row place-content-around items-center gap-4 rounded-md border-2 px-2 py-2 font-semibold shadow-none hover:shadow-sm"
      >
        <span>Donate</span>
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div
                className="payments-iframe-container"
                data-src="https://app.hubspot.com/payments/H69fKpvV?referrer=PAYMENT_LINK_EMBED&layout=embed-full"
              />
              <script
                src="https://static.hsappstatic.net/payments-embed/ex/PaymentsEmbedCode.js"
                onLoad={() => console.log('script loaded')}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
