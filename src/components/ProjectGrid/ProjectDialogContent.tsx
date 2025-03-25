import type { Project } from 'env';
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

const ListSection = ({ title, items }) => !!items.length && (
	<div className="pb-4">
		<p className="font-bold pb-2">{title}</p>
		<ul>
			{items.map(item => (
				<li className="inline">
					{item}
				</li>
			))}
		</ul>
	</div>
)

export default function ProjectDialogContent({ project }: { project: Project }) {
	const { features, name, industries, languages, logo, short_description, support_year_start, website_link } = project.data
	return (
		<div className="grid grid-cols-12 px-4 py-5 gap-4 sm:p-6 text-sm">
			<div className="col-span-7 border-r-2 border-orange-500">
				<img
					src={`${assetBaseUrl}${logo.src}`}
					alt={name}
					className="h-42 w-42 float-right"
				/>
				<div>
					{/* <div className="flex flex-col align-top gap-4"> */}
						<h5 className="pb-4">{name}</h5>
						{support_year_start && (
							<p className="italic pb-4">{`NumFOCUS Sponsored Project since ${support_year_start}`}</p>
						)}
						
						<p className="text-sm pb-4">{short_description}</p>					
					{/* </div> */}
				</div>
			</div>
			<div className="col-span-5 flex flex-col col">
				<ListSection title="Languages" items={languages} />
				<ListSection title="Industries" items={industries} />
				<ListSection title="Features" items={features} />

				{!!website_link && <a href={website_link}>{`Visit ${name} website`}</a>}
				<a href={"#"}>{`Contribute to ${name}`}</a>
				
			</div>
		</div>
	);
}
