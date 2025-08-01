import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import type { CustomContentItem, Image } from 'env';
import fetchRemoteImage from './fetchRemoteImage';

const fetchImagesByEditorNode = async (editorNode: any) => {
  const { collection, item } = editorNode;

  const newItem = item;

  if (collection === 'block_custom_content_group') {
    const itemsWImages = item.items.map(({ block_custom_content_item_id }: { block_custom_content_item_id: CustomContentItem }) => {
      return new Promise(resolve => {
        fetchRemoteImage(block_custom_content_item_id.image).then(fetchedImage => {
          resolve({ ...block_custom_content_item_id, image: fetchedImage });
        })
      })
    })

    newItem.items = await Promise.all(itemsWImages)

  } else if (collection === 'block_hero') {
    newItem.image = await fetchRemoteImage(item.image)

  } else if (collection === 'block_image') {
    newItem.image = await fetchRemoteImage(item.image)

  } else if (collection === 'block_image_gallery') {
    const fetchedImages = item.images.map(
      ({ directus_files_id }: { directus_files_id: Image }) => fetchRemoteImage(directus_files_id)
    )
    newItem.images = await Promise.all(fetchedImages);

  } else if (collection === 'block_testimonial') {
    newItem.image = await fetchRemoteImage(item.image)
    
  } else if (collection === 'block_toc') {
    const imagePromises = item.editor_nodes?.map(fetchImagesByEditorNode)

    newItem.editor_nodes = await Promise.all(imagePromises);
  } 

  return ({...editorNode, item: newItem})
}

export default async function fetchFlexibleEditorImages(page: any) {
  const imagePromises = page.editor_nodes?.map(fetchImagesByEditorNode)

  const editorNodes = await Promise.all(imagePromises)
  
  return editorNodes;
}
