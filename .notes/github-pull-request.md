# Git Pull Request

Here are the Git commands you can use to pull from the base repository before creating a PR:

1. Check your current remotes
First, let's check which remotes you already have configured:

```bash
git remote -v
```

2. Add the base repository as a remote (if needed)
If you haven't added the base repository as a remote yet, add it now:

```bash
git remote add upstream https://github.com/CouchCMS/Documentation.git
```

Here, "upstream" is the conventional name for the base repository, but you can choose any name. Replace the URL with the actual URL of the base repository.

3. Fetch the latest changes from the base repository

```bash
git fetch upstream
```

4. Make sure you're on your feature branch

```bash
git checkout docs-v2
```

5. Merge changes from the base repository into your branch

```bash
git merge upstream/docs-v2
```

Here, "main" is the main branch of the base repository. This could also be "master" or another name, depending on the repository.

6. Resolve any merge conflicts

If there are merge conflicts, resolve them.

7. Push your updated branch to your fork

```bash
git push origin docs-v2
```

8. Now create your PR
You can now go to GitHub (or another platform) and create a PR from your branch to the base repository.

This workflow ensures your branch is up-to-date with the base repository before creating a PR, which reduces the chance of merge conflicts.