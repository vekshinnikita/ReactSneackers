Last login: Tue May 17 12:53:03 on console
user@MacBook-Pro-user ~ % ssh nikita@sneackers.site
Linux 882041-cn15455.tmweb.ru 5.10.0-8-amd64 #1 SMP Debian 5.10.46-4 (2021-08-03) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Fri May  6 14:54:22 2022 from 91.238.230.158
nikita@882041-cn15455:~$ ls
ReactSneackers
nikita@882041-cn15455:~$ cd 
.docker/        ReactSneackers/ .ssh/           .vim/           
nikita@882041-cn15455:~$ cd 
.docker/        ReactSneackers/ .ssh/           .vim/           
nikita@882041-cn15455:~$ cd ReactSneackers/
nikita@882041-cn15455:~/ReactSneackers$ docker-compose down
[+] Running 6/5
 ⠿ Container reactsneackers-certbot-1   Removed                                                                                                                   0.4s
 ⠿ Container reactsneackers-nginx-1     Removed                                                                                                                   0.3s
 ⠿ Container reactsneackers-frontend-1  Removed                                                                                                                   0.2s
 ⠿ Container reactsneackers-backend-1   Removed                                                                                                                  10.2s
 ⠿ Container reactsneackers-db-1        Removed                                                                                                                   0.2s
 ⠿ Network reactsneackers_default       Removed                                                                                                                   0.1s
nikita@882041-cn15455:~/ReactSneackers$ git pull
hint: Pulling without specifying how to reconcile divergent branches is
hint: discouraged. You can squelch this message by running one of the following
hint: commands sometime before your next pull:
hint: 
hint:   git config pull.rebase false  # merge (the default strategy)
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
remote: Enumerating objects: 23, done.
remote: Counting objects: 100% (23/23), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 13 (delta 8), reused 13 (delta 8), pack-reused 0
Unpacking objects: 100% (13/13), 1.75 KiB | 162.00 KiB/s, done.
From https://github.com/vekshinnikita/ReactSneackers
   f12204f..1a4cff0  master     -> origin/master
Updating 473314b..1a4cff0
error: Your local changes to the following files would be overwritten by merge:
	backend/backend/settings.py
	init-letsencrypt.sh
	nginx/nginx.conf
Please commit your changes or stash them before you merge.
Aborting
nikita@882041-cn15455:~/ReactSneackers$ git add .
warning: could not open directory 'certbot/conf/archive/': Permission denied
warning: could not open directory 'certbot/conf/keys/': Permission denied
warning: could not open directory 'certbot/conf/accounts/': Permission denied
nikita@882041-cn15455:~/ReactSneackers$ sudo git add .
[sudo] password for nikita: 
nikita@882041-cn15455:~/ReactSneackers$ git commit -m 'changes server'
error: insufficient permission for adding an object to repository database .git/objects
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: empty ident name (for <nikita@882041-cn15455.tmweb.ru>) not allowed
nikita@882041-cn15455:~/ReactSneackers$ ls
backend  certbot  docker-compose.yml  init-letsencrypt.sh  nginx  package.json  package-lock.json  reactsneacker
nikita@882041-cn15455:~/ReactSneackers$ vim nginx/nginx.conf
nikita@882041-cn15455:~/ReactSneackers$  git config --global user.email 'vekshinnikita@yandex.ru'
nikita@882041-cn15455:~/ReactSneackers$ git config --global user.name "Nikita Server"
nikita@882041-cn15455:~/ReactSneackers$ git commit -m 'changes server'
error: insufficient permission for adding an object to repository database .git/objects
error: insufficient permission for adding an object to repository database .git/objects
error: Error building trees
nikita@882041-cn15455:~/ReactSneackers$ init-letsencrypt.sh
-bash: init-letsencrypt.sh: command not found
nikita@882041-cn15455:~/ReactSneackers$ vim init-letsencrypt.sh

#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=(sneackers.site)
rsa_key_size=4096
data_path="./certbot"
email="vekshinnikita@yandex.ru" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi


if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
docker-compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx ..."
docker-compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains ..."
docker-compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo
"init-letsencrypt.sh" 80L, 2496B                                                                                                                     38,4          Top
