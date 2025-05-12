import type { LinkType } from 'env';

export default function Link({ children, link }: React.ComponentProps<'a'> & { link: LinkType }) {
  const { external_link, internal_link, slug, type_of_link } = link;
 
  if (type_of_link === 'external') {
    return (
      <a
        href={`//${external_link}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
  
  const rawHref = internal_link?.[0]?.item?.slug || slug;
    
  return (
    <a
      href={`/${rawHref}`}
    >
      {children}
    </a>
  );
}
