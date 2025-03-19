import { twMerge } from 'tailwind-merge';
import type { Button } from 'env';
import {
  Heart,
  Mail,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
} from 'lucide-react';

interface Props {
  button: Button;
  icon?: 'heart' | 'envelope';
  arrow?: 'right' | 'left' | 'down';
}

const variantClasses = {
  primary:
    'bg-gradient-to-r to-yellow-500 from-orange-600 text-white shadow-none focus:ring-4',
  secondary:
    'bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-none focus:ring-4 hover:border-2',
  muted: 'text-teal-500 border-teal-500 border-2',
};

const iconVariant = {
  heart: <Heart color="white" fill="white" />,
  envelope: <Mail color="white" />,
};

const arrowVariant = {
  left: <ArrowLeftIcon className="ml-12" />,
  right: <ArrowRightIcon className="ml-12" />,
  down: <ArrowDownIcon className="ml-12" />,
};

export default function Button({ button, icon, arrow }: Props) {
  return (
    <a
      href={button.link}
      className={twMerge(
        'text-md inline-flex flex-row gap-4 rounded-md px-4 py-2 font-bold',
        button && variantClasses[button.variant]
      )}
    >
      {icon && iconVariant[icon]}
      <span>{button.text}</span>

      {arrow && arrowVariant[arrow]}
    </a>
  );
}
