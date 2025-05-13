import Dialog from '@components/Atoms/Dialog';
import groupBy from '@utils/groupBy';
import type { CardMeta } from 'env';
import { useMemo, useState } from 'react';
import { twMerge} from 'tailwind-merge';
import Link from './Atoms/Link';

const articleTypes = {
  singular: {
    news: 'News and Updates',
    case_study: 'Case Study',
    press_release: 'Press Release',
    community_update: 'Community Update',
    sponsor_highlight: 'Sponsor Highlight',
    member_highlight: 'Member Highlight',
    opinion: 'Opinion',
  },
  pluralTabs: {
    all: 'All Articles',
    news: 'News and Updates',
    case_study: 'Case Studies',
    press_release: 'Press Releases',
    community_update: 'Community Updates',
    sponsor_highlight: 'Sponsor Highlights',
    member_highlight: 'Member Highlights',
    opinion: 'Opinions',
  },
};


export default function ArticleGrid({
  articles,
}: {
  articles: CardMeta[];
}) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article, i) => (
        activeTab === 'all' || article.type === activeTab
      ))
  }, [articles, activeTab]);
  
  console.log(activeTab)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="article-grid-filter mt-8">
          <h4 className="text-lg">Filter Articles</h4>
          <div className="grid grid-cols-1 lg:hidden">
            {/* <!-- Use an "onChange" listener to redirect the user to the selected tab URL. --> */}
            <select
              aria-label="Select a tab"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              {
                Object.entries(articleTypes.pluralTabs).map(([key, type]) => (
                  <option key={key} value={key}>{type}</option>
                ))
              }
            </select>
            <svg
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fill-rule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"/>
            </svg>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {
                  Object.entries(articleTypes.pluralTabs).map(([key, type]) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={twMerge(
                        "border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer transition-colors",
                        key === activeTab ? "border-indigo-500 text-indigo-600 hover:border-indigo-500 hover:text-indigo-600" : ""
                      )}
                    >
                      {type}
                    </button>
                  ))
                }
                {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
              </nav>
            </div>
          </div>
        </div>
        <div
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {
            filteredArticles.map((article) => (
              <article key={article.id} className="">
                <Link 
                  link={{
                    type_of_link: "internal",
                    slug:`articles/${article.slug}`
                  }}
                >
                  {!!article.image && (
                    <div className="relative hover:shadow-sm rounded-2xl transition">
                       <img
                          src={article.image}
                          alt={article.title}
                          className="w-full my-5 rounded-lg"
                        />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  )}
                </Link>
                <div className="mt-4 flex items-center gap-x-4 text-xs">
                  <time datetime="2020-03-16" className="text-gray-500">
                    {article.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="relative z-10 rounded-md bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {article.type &&
                      articleTypes.singular[
                        article.type as keyof typeof articleTypes.singular
                      ]}
                  </span>
                </div>
                <div className="max-w-xl">
                  <Link 
                    link={{
                      type_of_link: "internal",
                      slug:`articles/${article.slug}`
                    }}
                  >
                    <div className="group relative">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <span className="absolute inset-0" />
                        {article.title}
                      </h3>
                    </div>
                    <div
                      className="mt-5 line-clamp-3 text-sm/6 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                  </Link>
                </div>
              </article>
            ))
          }
        </div>
      </div>
    </div>
  );
}