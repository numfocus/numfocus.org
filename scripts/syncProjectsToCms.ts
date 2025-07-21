// Sync project data from local YAML files to Directus CMS
// Preserves CMS-only fields (isFeatured, donateLink)
// Note: Runs as standalone Node.js script, not in Astro environment

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import {
  createDirectus,
  createItem,
  deleteItem,
  readItems,
  rest,
  staticToken,
  updateItem,
} from '@directus/sdk';
import { glob } from 'glob';
import slugify from 'slugify';
import { parse } from 'yaml';

// Setup Directus connection
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

// Generate stable ID from project name
function generateProjectId(projectName: string): string {
  const hash = createHash('md5')
    .update(projectName.toLowerCase())
    .digest('hex')
    .substring(0, 8);
  const slug = slugify(projectName, { lower: true, strict: true });
  return `${slug}-${hash}`;
}

// Load and parse YAML file into project data
function loadProjectFromYaml(yamlPath: string): CmsProjectData | null {
  try {
    const content = readFileSync(yamlPath, 'utf-8');
    const data = parse(content) as ProjectData;

    if (!data.name || !data.type || !data.short_description) {
      console.warn(`Skipping ${yamlPath}: Missing required fields`);
      return null;
    }

    const projectName = data.name;
    // const id = generateProjectId(projectName);
    const id = slugify(projectName.replace(/\/[^/]+$/, ''), { lower: true });

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

// Create or update project in CMS (preserves CMS-only fields)
async function syncProjectToCms(projectData: CmsProjectData): Promise<boolean> {
  try {
    // Check if project exists
    const existingProjects = await directus.request(
      readItems('projects_sync', {
        filter: { id: { _eq: projectData.id } },
        limit: 1,
      })
    );

    if (existingProjects.length > 0) {
      // Update existing (preserves isFeatured, donateLink)
      await directus.request(
        updateItem('projects_sync', projectData.id, projectData)
      );
      console.log(`✓ Updated project: ${projectData.name}`);
    } else {
      // Create new with default CMS-only fields
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

// Remove CMS projects that no longer exist locally
async function cleanupRemovedProjects(localProjectIds: Set<string>): Promise<number> {
  try {
    console.log('\n🧹 Checking for removed projects...');
    
    // Get all CMS projects and find orphans
    const allCmsProjects = await directus.request(
      readItems('projects_sync', {
        limit: -1, // Fetch all records (no pagination limit)
      })
    );
    
    console.log(`   Found ${allCmsProjects.length} projects in CMS`);
    const projectsToDelete = allCmsProjects.filter(
      (project) => !localProjectIds.has(project.id)
    );

    if (projectsToDelete.length === 0) {
      console.log('   No projects to remove from CMS');
      return 0;
    }

    console.log(`   Found ${projectsToDelete.length} projects to remove from CMS`);

    let deleteCount = 0;
    for (const project of projectsToDelete) {
      try {
        await directus.request(deleteItem('projects_sync', project.id));
        console.log(`   ✓ Removed project: ${project.name}`);
        deleteCount++;
      } catch (error) {
        console.error(`   ✗ Failed to remove project ${project.name}:`, error);
      }
    }

    return deleteCount;
  } catch (error) {
    console.error('   ✗ Failed to cleanup removed projects:', error);
    return 0;
  }
}

// Main sync function: sync all projects and cleanup orphans
async function syncAllProjects(): Promise<void> {
  console.log('🚀 Starting project sync...');

  // Find all project YAML files
  const yamlFiles = glob.sync('src/data/projects/*/*.yaml', {
    cwd: process.cwd(),
  });

  console.log(`Found ${yamlFiles.length} project YAML files`);

  let successCount = 0;
  let failureCount = 0;
  const localProjectIds = new Set<string>();

  // Sync all local projects to CMS
  for (const yamlFile of yamlFiles) {
    const projectData = loadProjectFromYaml(yamlFile);
    if (projectData) {
      localProjectIds.add(projectData.id);
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

  // Remove projects from CMS that no longer exist locally
  const deletedCount = await cleanupRemovedProjects(localProjectIds);

  console.log('\n📊 Sync completed:');
  console.log(`   ✓ ${successCount} projects synced successfully`);
  console.log(`   ✗ ${failureCount} projects failed`);
  if (deletedCount > 0) {
    console.log(`   🗑️  ${deletedCount} projects removed from CMS`);
  }

  if (failureCount > 0) {
    process.exit(1);
  }
}

// Run the sync
syncAllProjects().catch((error) => {
  console.error('💥 Sync failed:', error);
  process.exit(1);
});
