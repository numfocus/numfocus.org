import type { SocialsType } from 'env';
import { IconContext } from 'react-icons';
import { LuEarth, LuMail } from 'react-icons/lu';
import {
  SiBluesky,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiMastodon,
  SiX,
  SiYoutube,
} from 'react-icons/si';



const icons = {
  facebook: <SiFacebook />,
  instagram: <SiInstagram />,
  bluesky: <SiBluesky />,
  linkedin: <SiLinkedin />,
  x: <SiX />,
  youtube: <SiYoutube />,
  mastodon: <SiMastodon />,
  github: <SiGithub />,
  email: <LuMail />,
  custom_website: <LuEarth />,
};

export default function Social({ social, size = 4 }: { social: SocialsType, size: number  }) {
  const { platform, url } = social;

  const iconStyle = `w-${size} h-${size}`;

  return (
    <IconContext.Provider value={{ className: iconStyle }}>
      <a
        className="hover:text-brand-teal text-brand-gray block transition"
        href={platform === 'email' ? `mailto:${url}` : url}
      >
        {icons[platform]}
      </a>
    </IconContext.Provider>
  );
}
