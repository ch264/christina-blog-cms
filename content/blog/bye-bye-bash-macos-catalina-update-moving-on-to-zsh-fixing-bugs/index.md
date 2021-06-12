---
title: Bye Bye Bash! MacOS Catalina update, moving on to zsh, fixing bugs
date: 2020-03-20T15:18:34.824Z
description: "Tutorial: How to debug going from bash to zsh"
thumbnail: "1__z7rtesdxpuyvgih-t59_w.jpeg"
hashtag:
    - React
    - Redux
    - Sass
    - Jest
---
![Mac computer with microphone and clock](1__z7rtesdxpuyvgih-t59_w.jpeg)

Bye Bye Bash! MacOS Catalina update, moving on to zsh, fixing bugs

When I updated my macOS to Catalina I went from using bash to using zsh and ran into a few issues. This is a short Tutorial on how I fixed them.

I upgraded to the new OS Catalina, which now uses zsh instead of bash.

To install szh run:

```bash
chsh -s /bin/zsh
```

I received this error when trying to do ‘git branch’:

```bash
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

In order to fix it I ran:

```bash
xcode-select --install
```

The problem is that one has to explicitly agree to the license agreement. If that does not work try:

```bash
xcode-select --reset
```

If your terminal yells at you to use sudo, you can run the following command, which will ask you for your password:

```bash
sudo xcode-select --reset
```

I then created a \~/.zshrc file and copied in everything from my \~/.bash_profile. This fixed all my errors I was receiving.

- - -

I hope this very quick debug tips help you to upgrade to Catalina and to start using zsh.