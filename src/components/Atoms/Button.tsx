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

const variantStyles = {
  light: {
    default: 'px-2 text-black',
    outlined:
      'text-teal-500 border-teal-500  shadow-none hover:shadow-sm border-2',
    special:
      'text-brand-orange shadow-none hover:shadow-sm border-2 border-brand-orange',
    newsletter:
      'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-none',
  },
  dark: {
    default: 'px-2 text-white',
    outlined: 'text-white border-2 border-white ',
    special:
      'text-brand-orange  hover:shadow-sm border-2 border-brand-orange shadow-none',
    newsletter:
      'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-none',
  },
};

const iconVariant = {
  heart: <Heart color="white" fill="white" />,
  envelope: <Mail color="black" />,
};

const arrowVariant = {
  left: <ArrowLeftIcon className="" />,
  right: (
    <ArrowRightIcon className="ml-12 transition group-hover:translate-x-1" />
  ),
  down: <ArrowDownIcon className="" />,
};

export default function Button({ button, arrow }: Props) {
  const buttonStyle = twMerge(
    'text-md group inline-flex min-w-48 cursor-pointer flex-row items-center gap-4 rounded-md px-2 py-2 font-bold transition hover:shadow-sm',
    button && variantStyles.light[button.variant]
  );

  return (
    <a href={button.link} className="block">
      <div className={buttonStyle}>
        <span>{button.text}</span>
        {arrow && arrowVariant[arrow]}
      </div>
    </a>
  );
}
