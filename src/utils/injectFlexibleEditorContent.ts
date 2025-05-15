import { getImage } from 'astro:assets';
import getAssetUrl from '@utils/getAssetUrl';
import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import type { Image } from 'env';

const fetchImage = async (img) => {
  const remoteUrl = getAssetUrl(img.id);
  return new Promise<Image>((resolve) => {
    getImage({
      src: remoteUrl,
      inferSize: true
    }).then((fetchedImage) =>
      resolve({
        ...img,
        src: fetchedImage?.src || remoteUrl
      })
    );
  });
}

const fetchNodeImages = async (editorNode: any) => {
  const { collection, item } = editorNode;

  const newItem = item;

  if (collection === 'block_hero') {
    newItem.image = await fetchImage(item.image)
  } else if (collection === 'block_image') {
    newItem.image = await fetchImage(item.image)
  } else if (collection === 'block_image_gallery') {
    const fetchedImages = item.images.map(
      ({ directus_files_id }: { directus_files_id: Image }) => fetchImage(directus_files_id)
    )
    newItem.images = await Promise.all(fetchedImages);
  } else if (collection === 'block_testimonial') {
    newItem.image = await fetchImage(item.image)
  } else if (collection === 'block_toc') {
    const imagePromises = item.editor_nodes?.map(fetchNodeImages)

    newItem.editor_nodes = await Promise.all(imagePromises);
  }

  return ({...editorNode, item: newItem})
}

export default async function injectFlexibleEditorContent(page: any) {
  const imagePromises = page.editor_nodes?.map(fetchNodeImages)

  const newEditorNodes = await Promise.all(imagePromises)
    
  const cleanPage = injectDataIntoContent(newEditorNodes, page.body_content);

  return cleanPage
}
