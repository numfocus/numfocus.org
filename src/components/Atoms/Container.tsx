export default function Container(props: any) {
  return (
    <div className="mx-24 grid max-w-11/12 grid-cols-12 gap-4">
      <div className="col-span-10 col-start-2">{props.children}</div>
    </div>
  );
}
