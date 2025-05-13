import Button from '@components/Atoms/Button';
import type { ButtonType } from 'env';

export default function NewsletterSignup({
  title,
  description,
  button,
}: {
  title: string,
  description: string
  button: ButtonType;
}) {
  const onSubmit = (formData: FormData) => {
    const email = formData.get('email');
    // console.log('Subscribing', email);
  };

  return (
    <>
      <div>
        <p className="font-bold pb-4">{title}</p>
        <p>
          {description}
        </p>
      </div>
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
    </>
  );
}
