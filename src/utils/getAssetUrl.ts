export default function getAssetUrl(id?: string) {
  return `${import.meta.env.DIRECTUS_URL}assets/${id}`;
}
