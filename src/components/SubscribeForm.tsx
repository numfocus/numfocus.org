import { Input } from '@lib/components/ui/input';
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
    <form action={onSubmit} className="flex gap-2">
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        className="rounded-sm border-1 py-2 px-2 md:px-6 bg-purple-500 hover:bg-purple-400 transition"
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
