import { useEffect } from 'react';

const fetchProjectFromURL = () => {
  const url = new URL((window as Window).location.href);
  const donateCode = url.searchParams.get('code');

  if (donateCode) {
    return donateCode;
  }
};

export default function DonateComponent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://static.hsappstatic.net/payments-embed/ex/PaymentsEmbedCode.js';
    document.body.appendChild(script);
  }, []);
  return (
    <>
      {fetchProjectFromURL()}
      <div
        className="payments-iframe-container"
        data-src="https://app.hubspot.com/payments/H69fKpvV?referrer=PAYMENT_LINK_EMBED&layout=embed-full"
      />
    </>
  );
}
