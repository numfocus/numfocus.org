const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

interface Props {
  id: string;
  content: string;
  image: string;
  author: string;
}

export default function Testimonial({ id, content, image, author }: Props) {
  return (
    <section className="isolate overflow-hidden bg-white px-6 lg:px-8" key={id}>
      <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
        <div className="absolute top-0 left-1/2 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,var(--color-indigo-100),white)] opacity-20 lg:left-36" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
        <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
          <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
            <blockquote
              className="text-xl/8 font-semibold text-gray-900 sm:text-2xl/9"
              dangerouslySetInnerHTML={{ __html: content }}
            ></blockquote>
          </div>
          <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
            <img
              alt=""
              src={`${assetBaseUrl}/${image}`}
              className="rounded-xl bg-indigo-50 lg:rounded-3xl"
            />
          </div>
          <figcaption className="text-base lg:col-start-1 lg:row-start-3">
            <div className="font-semibold text-gray-900">{author}</div>
            {/* <div className="mt-1 text-gray-500">CEO of Workcation</div> */}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
