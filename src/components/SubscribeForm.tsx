import Button from '@components/Atoms/Button';
import type { Button as TButton } from 'env';


const button: TButton = {
  text: 'Subscribe',
  link: "",
  variant: 'primary',
};


export default function SubscribeForm() {
  const onSubmit = (formData: FormData) => {
    const email = formData.get("email");
    console.log("Subscribing", email);
  }
  return (
    <form action={onSubmit} className="flex flex-col gap-2 items-center md:flex-row">
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        className="rounded-md border-1 w-full min-w-70 py-2 px-6 bg-purple-500 hover:bg-purple-400 focus:bg-purple-400 transition focus:ouline-0"
      />
      <Button 
        button={button}
        icon="envelope"
        arrow="right"
        type="submit"
      />
    </form>
  )
}
