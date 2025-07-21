import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import {
  createDirectus,
  createItem,
  readItems,
  rest,
  staticToken,
  updateItem,
} from '@directus/sdk';
import { glob } from 'glob';
import slugify from 'slugify';
import { parse } from 'yaml';

const DIRECTUS_URL = process.env.DIRECTUS_URL ? process.env.DIRECTUS_URL : '';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN
  ? process.env.DIRECTUS_TOKEN
  : '';

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error(
    'Missing required environment variables: DIRECTUS_URL and DIRECTUS_TOKEN'
  );
  process.exit(1);
}

const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

interface ProjectData {
  name: string;
  type: 'sponsored' | 'affiliated';
  support_year_start?: number;
  short_description: string;
  technical_details?: string;
  applications?: string;
  website_link?: string;
  contribute_link?: string;
  features?: string[];
  industries?: string[];
  languages?: string[];
}

interface CmsProjectData {
  id: string;
  name: string;
  type: 'sponsored' | 'affiliated';
  support_year_start?: number;
  short_description: string;
  technical_details?: string;
  applications?: string;
  website_link?: string;
  contribute_link?: string;
  features?: string[];
  industries?: string[];
  languages?: string[];
}

function generateProjectId(projectName: string): string {
  const hash = createHash('md5')
    .update(projectName.toLowerCase())
    .digest('hex')
    .substring(0, 8);
  const slug = slugify(projectName, { lower: true, strict: true });
  return `${slug}-${hash}`;
}

function loadProjectFromYaml(yamlPath: string): CmsProjectData | null {
  try {
    const content = readFileSync(yamlPath, 'utf-8');
    const data = parse(content) as ProjectData;

    if (!data.name || !data.type || !data.short_description) {
      console.warn(`Skipping ${yamlPath}: Missing required fields`);
      return null;
    }

    const projectName = data.name;
    const id = generateProjectId(projectName);

    return {
      id,
      name: data.name,
      type: data.type,
      support_year_start: data.support_year_start,
      short_description: data.short_description,
      technical_details: data.technical_details,
      applications: data.applications,
      website_link: data.website_link,
      contribute_link: data.contribute_link,
      // features: data.features,
      // industries: data.industries,
      // languages: data.languages,
    };
  } catch (error) {
    console.error(`Error loading ${yamlPath}:`, error);
    return null;
  }
}

async function syncProjectToCms(projectData: CmsProjectData): Promise<boolean> {
  try {
    const existingProjects = await directus.request(
      readItems('projects_sync', {
        filter: { id: { _eq: projectData.id } },
        limit: 1,
      })
    );

    if (existingProjects.length > 0) {
      await directus.request(
        updateItem('projects_sync', projectData.id, projectData)
      );
      console.log(`✓ Updated project: ${projectData.name}`);
    } else {
      await directus.request(
        createItem('projects_sync', {
          ...projectData,
          isFeatured: false,
          donateLink: null,
        })
      );
      console.log(`✓ Created project: ${projectData.name}`);
    }
    return true;
  } catch (error) {
    console.error(`✗ Failed to sync project ${projectData.name}:`, error);
    return false;
  }
}

async function syncAllProjects(): Promise<void> {
  console.log('🚀 Starting project sync...');

  const yamlFiles = glob.sync('src/data/projects/*/*.yaml', {
    cwd: process.cwd(),
  });

  console.log(`Found ${yamlFiles.length} project YAML files`);

  let successCount = 0;
  let failureCount = 0;

  for (const yamlFile of yamlFiles) {
    const projectData = loadProjectFromYaml(yamlFile);
    if (projectData) {
      const success = await syncProjectToCms(projectData);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    } else {
      failureCount++;
    }
  }

  console.log('\n📊 Sync completed:');
  console.log(`   ✓ ${successCount} projects synced successfully`);
  console.log(`   ✗ ${failureCount} projects failed`);

  if (failureCount > 0) {
    process.exit(1);
  }
}

syncAllProjects().catch((error) => {
  console.error('💥 Sync failed:', error);
  process.exit(1);
});
