import type { Project } from 'env';
import Button from '@components/Atoms/Button';
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

const ListSection = ({ title, items }: { title: string, items: string[] }) => !!items.length && (
	<div className="">
		<p className="font-bold pb-2">{title}</p>
		<ul className="text-light-teal-700">
			{items.map(item => (
				<li key={item} className="inline pr-1">
					{item}
				</li>
			))}
		</ul>
	</div>
)

export default function ProjectDialogContent({ project }: { project: Project }) {
	const { features, name, industries, languages, logo, short_description, support_year_start, website_link } = project.data
	return (
		<div className="grid grid-cols-12 px-5 py-6 gap-4 sm:p-6 text-sm">
			<div className="col-span-7 border-r-1 border-orange-500">
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
			<div className="col-span-5 flex flex-col col gap-5">
				<ListSection title="Languages" items={languages} />
				<ListSection title="Industries" items={industries} />
				<ListSection title="Features" items={features} />

				{!!website_link && (
					<Button
						button={{
							text: `Visit ${name} website`,
							link: website_link,
							variant: "minimal"
						}}
						arrow="right"
					/>
				)}
				<Button
					icon="heart"
					button={{
						text: `Donate to ${name}`,
						link: "#",
						variant: "donate"
					}}
				/>
			</div>
		</div>
	);
}
