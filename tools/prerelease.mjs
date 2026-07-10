// Publishes a prerelease of a single project to npm under the "next" dist-tag.
//
// This intentionally bypasses the workspace's nx.json `release` configuration
// (which is tailored to the "real" release flow: git commit, tag, push, and
// GitHub release creation - see release.yml) by using the `ReleaseClient`
// programmatic API with `ignoreNxJsonConfig: true`. This lets us version and
// publish a project without performing any git operations, while still
// honouring per-project release config (e.g. `manifestRootsToUpdate`) defined
// in each project's own project.json.
//
// Usage: node tools/prerelease.mjs <project-name>
import { ReleaseClient } from 'nx/release';

const [project] = process.argv.slice(2);
if (!project) {
  console.error('Usage: node tools/prerelease.mjs <project-name>');
  process.exit(1);
}

const client = new ReleaseClient(
  {
    projects: [project],
    version: {
      currentVersionResolver: 'registry',
      currentVersionResolverMetadata: { tag: 'next' },
      fallbackCurrentVersionResolver: 'disk',
    },
  },
  /* ignoreNxJsonConfig */ true,
);

const { projectsVersionData } = await client.releaseVersion({
  specifier: 'prerelease',
  preid: 'pre',
  projects: [project],
  gitCommit: false,
  gitTag: false,
  stageChanges: false,
  versionActionsOptionsOverrides: { skipLockFileUpdate: true },
});

const newVersion = projectsVersionData[project]?.newVersion;
if (!newVersion) {
  console.log(`No prerelease version was generated for "${project}".`);
  process.exit(0);
}

console.log(`Publishing ${project}@${newVersion} to npm with dist-tag "next"`);

await client.releasePublish({
  projects: [project],
  tag: 'next',
});
