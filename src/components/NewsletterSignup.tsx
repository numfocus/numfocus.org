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
        <h5 className="pb-4">{title}</h5>
        <p>
          {description}
        </p>
      </div>
      <form
        action={onSubmit}
        className="flex flex-row items-center gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="focus:ouline-0 min-w-70 border-2 w-full text-md rounded-sm p-2"
        />
        <Button button={button} icon="envelope" />
      </form>
    </>
  );
}
