import Button from '@components/ui/Button';
import type { ButtonType } from 'env';

export default function NewsletterSignup({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button: ButtonType;
}) {
  const onSubmit = (formData: FormData) => {
    const email = formData.get('email');
    // console.log('Subscribing', email);
  };

  return (
    <div className="flex w-full flex-col justify-between gap-4 pb-8 text-center md:flex-row md:gap-12 md:text-left">
      <div>
        <h5 className="pb-4">{title}</h5>
        <p>{description}</p>
      </div>
      <form
        action={onSubmit}
        className="flex flex-col items-center gap-2 md:flex-row"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="min-w-70 text-md rounded-sm border-2 p-2 focus:outline-0"
        />
        <Button button={button} icon="envelope" />
      </form>
    </div>
  );
}
