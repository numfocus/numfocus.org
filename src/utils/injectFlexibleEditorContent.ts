import { getImage } from 'astro:assets';
import getAssetUrl from '@utils/getAssetUrl';
import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';

const fetchImage = async (img) => {
  const remoteUrl = getAssetUrl(img.id);
  return new Promise((resolve) => {
    getImage({
      src: remoteUrl,
      width: 800,
      height: 800,
      fit: 'cover',
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

  if (collection === 'block_image') {
    newItem.image = await fetchImage(item.image)
  }

  return ({...editorNode, item: newItem})
}

export default async function injectFlexibleEditorContent(page: any) {
  const imagePromises = page.editor_nodes?.map(fetchNodeImages)

  const newEditorNodes = await Promise.all(imagePromises)
    
  const cleanPage = injectDataIntoContent(newEditorNodes, page.body_content);

  return cleanPage
}
