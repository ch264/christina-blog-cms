---
title: GitHub Actions Markdown lint Setup
date: 2021-06-10T23:20:52.024Z
description: This is a tutorial to show you how I set up GitHub Actions for Markdown linting with David Ansons’s Markdownlint library.
thumbnail: "./tea.jpeg"
hashtag: 
- JavaScript
- Markdown
- Github Actions
- Linter
---
![tea, scissors and keyboard](https://miro.medium.com/max/7528/1*agCoOF8taDQ9mDMhR15t3g.jpeg)

# What is a Markdown linter?

Markdown is the Markup language that our docs are written in. **A Markdown linter is a library of rules that standardize how Markdown files are written and merged into your codebase.** This ensures that the codebase is standardized and readable for the rest of the community. My Markdown linter is configured to run on a pull-request and checks that the code in the pull-request matches my Markdown Language quality settings. Once the linter finishes, it will give a status update of “fail” or “pass”. Having a linter in place increases code quality and pages being rendered the way they are supposed to.

# Why GitHub Actions CI Tool?

The biggest plus for implementing GitHub actions was the removal of another third party tool and offering a completely free plan for open source projects. GitHub Actions can be run on Linux, macOS, Windows and containers, or run directly in a VM. It helps me add custom workflows directly in my GitHub Repo.

# How we setup GitHub Actions CI Tool for Markdown linting

1. Sign up the to GitHub Actions Beta

![](https://miro.medium.com/max/60/1*7EY6RSl8eOPBho3gTz-EBA.png?q=20)

![](https://miro.medium.com/max/3200/1*7EY6RSl8eOPBho3gTz-EBA.png)

2. Go to the “Actions” tab and select: “set up workflow yourself”

![](https://miro.medium.com/max/60/1*AVTdp7pYzgtUGY9JqGbM_A.png?q=20)

![](https://miro.medium.com/max/7588/1*AVTdp7pYzgtUGY9JqGbM_A.png)

3. Create a .yml file with the name, when the linter should run and the actual command to run the linter. GitHub provides excellent Documentation on the side to support the setting up of your yml file.\
   I have set my linter to run on pull_request but you can also set it to push.

![](https://miro.medium.com/max/60/1*9sVN2BcjvQDiYK4V9vGjhQ.png?q=20)

![](https://miro.medium.com/max/6556/1*9sVN2BcjvQDiYK4V9vGjhQ.png)

4. If your project does not have package.json file yet, create a package.json file with an empty curly braces in order to store your linter as a dependency.

![](https://miro.medium.com/max/60/1*82zzDNrT-s7Kjjd0RRxI6g.png?q=20)

![](https://miro.medium.com/max/3200/1*82zzDNrT-s7Kjjd0RRxI6g.png)

5. We want to glob our files when running the Markdown linter so we use [Markdownlint-cli](https://www.npmjs.com/package/markdownlint-cli), which uses the [Markdownlint](https://github.com/markdownlint/markdownlint) library by DavidAnson. Run the following command to create a dependency in your package.json.

```

```

6. Create a .markdownlint.yml file and pass in your configuration settings. Here is a starter code for your settings:

```

```

# Run the linter locally

In order to run the Markdown linter locally, clone down the repo and run

```

```

# Run the linter on a branch’s modified files

If you would like to run the linter only on the branch that you would like to merge you can add the following code to your GitHub Actions workflow file

```

```

You will also have to create a bash script *mdlint.sh*

```

```

You can call the script by adding it in you *package.json*

```

```

Congratulations! Your Github Actions CI Tool with Markdownlinting has now been successfully setup. You can watch the linter run when pushing code or creating a pull-request to the branch you set in your workflow file.