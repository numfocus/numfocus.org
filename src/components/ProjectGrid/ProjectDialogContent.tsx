import type { Project } from 'env';
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;


export default function ProjectDialogContent({ project }: { project: Project }) {
    const { name, logo, short_description, type } = project.data
    return (
        <div className="project-card border-numfocus-primary col-span-4 flex flex-col justify-between border">
            <div className="flex flex-wrap overflow-hidden px-4 py-5 sm:p-6">
                <h5 className="pt-8">{name}</h5>
                <img
                src={`${assetBaseUrl}${logo.src}`}
                alt={name}
                className="mx-auto my-0 h-42"
                />
                <p className="text-center text-sm">{short_description}</p>
                {/* <a href={website_link}>{website_link}</a> */}
            </div>
        </div>
    );
}
