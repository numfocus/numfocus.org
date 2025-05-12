import Button from '@components/Atoms/Button';
import type { ButtonType } from 'env';

export default function SubscribeForm({
  subscribeButton,
}: {
  subscribeButton: ButtonType;
}) {
  const onSubmit = (formData: FormData) => {
    const email = formData.get('email');
    // console.log('Subscribing', email);
  };

  // console.log(subscribeButton);
  return (
    <form
      action={onSubmit}
      className="flex flex-col items-center gap-2 md:flex-row"
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        className="focus:ouline-0 min-w-70 border-1 w-full rounded-md"
      />
      <Button button={subscribeButton} icon="envelope" />
    </form>
  );
}
