export default function Container(props: any) {
  return (
    <div className="grid max-w-11/12 grid-cols-12">
      <div className="col-span-8 col-start-3">{props.children}</div>
    </div>
  );
}
