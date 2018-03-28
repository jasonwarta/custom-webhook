# custom-webhook

This service is designed to be run on a server, and provides an endpoint for git webhooks to call on push events, to trigger service refresh and restart.

### Setup and Configuration
Clone this repo to some location on your computer. I have a folder `$HOME/projects` that most of my repos live in. Open `webhook.js` in your favorite editor and change the consts `PROJECTS_ROOT` and `PORT` to reflect your desired configuration.  

The default settings for those two variables are
```
const PROJECTS_ROOT = `${process.env.HOME}/projects`
const PORT = 8888;
```

Add a route to your apache or nginx config to point at the service. The following route is assigned to my default server, but you could place it anywhere.
```
server {
    location /webhook {
            proxy_pass http://localhost:8888/;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded_For $proxy_add_x_forwarded_for;
    }
}
```

This process requires a script called `reload.sh` to be located in the root of your project's repo, with the syntax you want for the git pull, as well as the correct command to restart the relevant service. For this project, my `reload.sh`, and another file it refers to, `restart.sh`, are listed below.

##### reload.sh
```bash
#!/usr/bin/env bash

git reset --hard && git pull
./restart.sh &

exit 0
```

##### restart.sh
```bash
#!/usr/bin/env bash

sleep 2

kill `pgrep -f 'nodejs webhook.js'` 2>&1 1>/dev/null 
nodejs webhook.js
```

Both of these scripts need to be flagged as executable.
```
chmod +x reload.sh
chmod +x restart.sh
```

Start the process with `nodejs webhook.js`, or by running the restart script.

### Add the webhook to your repo
For the project(s) you want to add a webhook to, navigate to the repo **Settings** tab, then **Webhooks**.  Add a new webhook, and enter your url. By default the webhook only activates on push events, so leave it as is, and click **Add webhook**.

Push events will now trigger a repo refresh and service reload, if you have configured the `reload.sh` script correctly.