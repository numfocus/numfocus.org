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

const variantClassesOld = {
  primary:
    'bg-gradient-to-r to-yellow-500 from-orange-600 text-white shadow-none focus:ring-4',
  secondary:
    'bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-none focus:ring-4 hover:border-2',
  muted: 'text-teal-500 border-teal-500 border-2',
};

const variantClasses = {
  primary: 'bg-yellow-500 shadow-none focus:ring-4',
  secondary:
    'bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-none focus:ring-4 ',
  muted: 'text-teal-500 border-teal-500 border-2',
  newsletter:
    'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-none focus:ring-4',
};

const iconVariant = {
  heart: <Heart color="white" fill="white" />,
  envelope: <Mail color="white" />,
};

const arrowVariant = {
  left: <ArrowLeftIcon className="ml-12" />,
  right: (
    <ArrowRightIcon className="ml-12 transition group-hover:translate-x-1" />
  ),
  down: <ArrowDownIcon className="ml-12" />,
};

export default function Button({ button, icon, arrow }: Props) {
  return (
    <a
      href={button.link}
      className={twMerge(
        'group text-md inline-flex w-full flex-row place-content-between rounded-md px-6 py-2 font-bold transition hover:shadow-sm',
        button && variantClasses[button.variant]
      )}
    >
      <div className="inline-flex flex-row gap-2">
        {icon && iconVariant[icon]}
        <span>{button.text}</span>
      </div>

      {arrow && arrowVariant[arrow]}
    </a>
  );
}
