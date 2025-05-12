import type { ButtonLink } from 'env';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Heart,
  Mail,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Props {
  button: ButtonLink;
  icon?: 'heart' | 'envelope';
  arrow?: 'right' | 'left' | 'down';
}

const variantStyles = {
  light: {
    default: ' text-black hover:text-brand-primary pl-0',
    outlined:
      'text-teal-500 border-teal-500  shadow-none border-2 transition hover:shadow-sm my-2',
    special:
      'text-brand-orange shadow-none hover:shadow-sm border-2 border-brand-orange',
    newsletter:
      'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-none',
  },
  dark: {
    default: ' text-white',
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
    <ArrowRightIcon className="ml-4 transition group-hover:translate-x-1" />
  ),
  down: <ArrowDownIcon className="" />,
};

export default function Button({ button, arrow }: Props) {
  const link = button.link;
  const buttonStyle = twMerge(
    'text-md group inline-flex min-w-24 cursor-pointer flex-row place-content-around items-center gap-4 rounded-md px-2 py-2 font-semibold',
    button &&
      variantStyles[button.style ? button.style : 'light'][button.variant]
  );

  const isExternal = link.type_of_link === 'external';
  const internalSlug = link.internal_link_parent
    ? `/${link.internal_link_parent}/${link.internal_link_slug}`
    : `/${link.internal_link_slug}`;

  // open all external links in a new tab
  const additionalProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <a
      href={isExternal ? link.external_link : internalSlug}
      className="block"
      {...additionalProps}
    >
      <div className={buttonStyle}>
        <span>{link.text}</span>
        {arrow && arrowVariant[arrow]}
      </div>
    </a>
  );
}
