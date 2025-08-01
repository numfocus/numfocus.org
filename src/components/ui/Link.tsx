import type { LinkType } from 'env';
import type React from 'react';

export default function Link({
  children,
  link,
}: React.ComponentProps<'a'> & { link: LinkType }) {
  const { external_link, internal_link, slug, type_of_link } = link;

  if (type_of_link === 'external') {
    return (
      <a href={`//${external_link}`} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  const internalLinkPage = internal_link?.[0]?.item;

  let fullSlug = '';
  if (internalLinkPage?.slug) {
    fullSlug = internalLinkPage.parent?.slug
      ? `${internalLinkPage.parent.slug}/${internalLinkPage.slug}`
      : internalLinkPage.slug;
  } else if (slug) {
    fullSlug = slug;
  }

  return <a href={`/${fullSlug}`}>{children}</a>;
}
