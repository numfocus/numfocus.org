import Button from '@components/Atoms/Button';
import type { Button as TButton } from 'env';

const button: TButton = {
  link: { text: 'Subscribe', slug: 'subscribe' },
  variant: 'outlined',
  style: 'light',
};

export default function SubscribeForm() {
  const onSubmit = (formData: FormData) => {
    const email = formData.get('email');
    console.log('Subscribing', email);
  };
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
      <Button button={button} icon="envelope" />
    </form>
  );
}
