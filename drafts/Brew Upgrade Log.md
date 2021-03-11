```sh
twenty-twenty➜  frontier : master ✘ :✖✹✭ ᐅ  brew upgrade
==> Upgrading 12 outdated packages:
deno 1.3.2 -> 1.6.0_1
doctl 1.53.0 -> 1.54.0
gh 1.3.1 -> 1.4.0
heroku/brew/heroku 7.47.4 -> 7.47.6
glib 2.66.2_1 -> 2.66.3
bash 5.0.18 -> 5.1
nginx 1.19.2 -> 1.19.5
youtube-dl 2020.07.28 -> 2020.12.14
node 15.3.0 -> 15.4.0
p11-kit 0.23.21 -> 0.23.22
fzf 0.22.0 -> 0.24.4
python@3.9 3.9.0_5 -> 3.9.1
==> Upgrading python@3.9 3.9.0_5 -> 3.9.1
==> Downloading https://homebrew.bintray.com/bottles/python%403.9-3.9.1.catalina.bottle.tar.gz
==> Downloading from https://d29vzk4ow07wi7.cloudfront.net/2b9946108e230384c48fcb4fcc07febd31e3987a7
######################################################################## 100.0%
==> Pouring python@3.9-3.9.1.catalina.bottle.tar.gz
==> /usr/local/Cellar/python@3.9/3.9.1/bin/python3 -s setup.py --no-user-cfg install --force --verbo
==> /usr/local/Cellar/python@3.9/3.9.1/bin/python3 -s setup.py --no-user-cfg install --force --verbo
==> /usr/local/Cellar/python@3.9/3.9.1/bin/python3 -s setup.py --no-user-cfg install --force --verbo
==> Caveats
Python has been installed as
  /usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
  /usr/local/opt/python@3.9/libexec/bin

You can install Python packages with
  pip3 install <package>
They will install into the site-package directory
  /usr/local/lib/python3.9/site-packages

See: https://docs.brew.sh/Homebrew-and-Python
==> Summary
🍺  /usr/local/Cellar/python@3.9/3.9.1: 4,452 files, 70.9MB
Removing: /usr/local/Cellar/python@3.9/3.9.0_5... (4,453 files, 72.2MB)
Removing: /Users/vtolbert/Library/Caches/Homebrew/python@3.9--3.9.0_4.catalina.bottle.tar.gz... (17.9MB)
Removing: /Users/vtolbert/Library/Caches/Homebrew/python@3.9--3.9.0_5.catalina.bottle.tar.gz... (17.9MB)
==> Upgrading doctl 1.53.0 -> 1.54.0
==> Downloading https://homebrew.bintray.com/bottles/doctl-1.54.0.catalina.bottle.tar.gz
==> Downloading from https://d29vzk4ow07wi7.cloudfront.net/6cce0b7933da1243b5e2d2bff4a80a1161e7a000f
######################################################################## 100.0%
==> Pouring doctl-1.54.0.catalina.bottle.tar.gz
==> Caveats
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/doctl/1.54.0: 9 files, 25.6MB
Removing: /usr/local/Cellar/doctl/1.53.0... (9 files, 25.6MB)
Removing: /Users/vtolbert/Library/Caches/Homebrew/doctl--1.53.0.catalina.bottle.tar.gz... (11.2MB)
==> Upgrading gh 1.3.1 -> 1.4.0
==> Downloading https://homebrew.bintray.com/bottles/gh-1.4.0.catalina.bottle.tar.gz
==> Downloading from https://d29vzk4ow07wi7.cloudfront.net/70c9d617f18341ab35bebc17b1916ec79cc053dbe
######################################################################## 100.0%
==> Pouring gh-1.4.0.catalina.bottle.tar.gz
==> Caveats
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/gh/1.4.0: 65 files, 16.7MB
Removing: /usr/local/Cellar/gh/1.3.1... (61 files, 16.5MB)
Removing: /Users/vtolbert/Library/Caches/Homebrew/gh--1.3.1.catalina.bottle.tar.gz... (5.7MB)
==> Upgrading heroku/brew/heroku 7.47.4 -> 7.47.6
==> Downloading https://cli-assets.heroku.com/heroku-v7.47.6/heroku-v7.47.6.tar.xz
######################################################################## 100.0%
==> Caveats
To use the Heroku CLI's autocomplete --
  Via homebrew's shell completion:
    1) Follow homebrew's install instructions https://docs.brew.sh/Shell-Completion
        NOTE: For zsh, as the instructions mention, be sure compinit is autoloaded
              and called, either explicitly or via a framework like oh-my-zsh.
    2) Then run
      $ heroku autocomplete --refresh-cache

  OR

  Use our standalone setup:
    1) Run and follow the install steps:
      $ heroku autocomplete

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/heroku/7.47.6: 27,546 files, 59.5MB, built in 43 seconds
Removing: /usr/local/Cellar/heroku/7.47.4... (27,545 files, 59.5MB)
Removing: /Users/vtolbert/Library/Caches/Homebrew/heroku--7.47.4.tar.xz... (6.9MB)
==> Upgrading glib 2.66.2_1 -> 2.66.3
==> Downloading https://homebrew.bintray.com/bottles/glib-2.66.3.catalina.bottle.tar.gz
==> Downloading from https://d29vzk4ow07wi7.cloudfront.net/765956dc4f0852ca3827cc16bb4a30f0065fe705f
######################################################################## 100.0%
==> Pouring glib-2.66.3.catalina.bottle.tar.gz
🍺  /usr/local/Cellar/glib/2.66.3: 436 files, 15.5MB
Removing: /usr/local/Cellar/glib/2.66.2_1... (436 files, 15.5MB)
Removing: /Users/vtolbert/Library/Caches/Homebrew/glib--2.66.2_1.catalina.bottle.tar.gz... (4.5MB)
==> Upgrading bash 5.0.18 -> 5.1
==> Downloading https://homebrew.bintray.com/bottles/bash-5.1.catalina.bottle.1.tar.gz
==> Downloading from https://d29vzk4ow07wi7.cloudfront.net/5b2eb18068b921fc3539eeba06c6846634f4a8f81
######################################################################## 100.0%
==> Pouring bash-5.1.catalina.bottle.1.tar.gz
🍺  /usr/local/Cellar/bash/5.1: 157 files, 10.9MB
Removing: /usr/local/Cellar/bash/5.0.18... (150 files, 9.5MB)
==> Upgrading nginx 1.19.2 -> 1.19.5
==> Downloading https://homebrew.bintray.com/bottles/nginx-1.19.5.catalina.bottle.tar.gz
==> Downloading from https://d29vzk4ow07wi7.cloudfront.net/aff0c071bc1b2e8e84e0dd99ffe01a6a29fc6fc93
######################################################################## 100.0%
==> Pouring nginx-1.19.5.catalina.bottle.tar.gz
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
==> Summary
🍺  /usr/local/Cellar/nginx/1.19.5: 25 files, 2.2MB
Removing: /usr/local/Cellar/nginx/1.19.2... (25 files, 2.1MB)
Error: Could not remove nginx keg! Do so manually:
  sudo rm -rf /usr/local/Cellar/nginx/1.19.2
```
