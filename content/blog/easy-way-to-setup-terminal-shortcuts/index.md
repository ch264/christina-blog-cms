---
title: Easy way to setup Terminal Shortcuts
date: 2021-05-14T23:34:44.347Z
thumbnail: computer-8.jpeg
description: How to create alias for your most used terminal commands
hashtag:
  - news
---
This is a very short tutorial to show you how can setup shortcuts to your most used terminal commands within seconds.

First, open your terminal and navigate to your home directory /~.

In your home directory you have hidden files. You can unhide these files by typing:

`$ ls -al`

You should now see a file called \`.zshrc\` (if you are using zsh)` .\
Open it up in vim or any other text editor.

`$ vi .zshrc`

If you opened up the file in vim, hit \`i\` for insert. Now you can create any alias you want. I have these setup:

```bash
alias gcm='git commit -m'\
alias ga='git add'\
alias gpo='git push origin'\
alias gc='git checkout'\
alias gcb='git checkout -b'\
alias gcd='git checkout develop'\
```

Once you have completed the alias, hit the `esc` button and type `:wq` to save your settings file.

`$ :wq`

Quit your terminal and re-open it to start using your new terminal shortcuts.

- - -

And that is it.

Super easy, super fast, and will save you so much time in the long run.