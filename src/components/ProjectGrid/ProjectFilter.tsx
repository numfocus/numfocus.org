export default function ProjectFilter({ key, items }: { key: any, items: any }) {
  return (
    <div className="">
        {key}
        {items.map(i => i.name)}
    </div>
  );
}
