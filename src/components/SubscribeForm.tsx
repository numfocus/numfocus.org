import Button from '@components/Atoms/Button';
import type { Button as TButton } from 'env';

const button: TButton = {
  text: 'Subscribe',
  link: '',
  variant: 'default',
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
        className="focus:ouline-0 w-full min-w-70 rounded-md border-1 bg-purple-500 px-6 py-2 transition hover:bg-purple-400 focus:bg-purple-400"
      />
      <Button button={button} icon="envelope" arrow="right" />
    </form>
  );
}
