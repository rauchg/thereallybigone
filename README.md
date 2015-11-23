The Really Big One
=================

[104.236.226.66](104.236.226.66)

[ ![Codeship Status for wearehanno/thereallybigone](https://codeship.io/projects/62ff1160-09e4-0132-177d-4af473c3e2ac/status?branch=master)](TODO)


####What's included?

1. Middleman prototyping setup using [Zurb Foundation](http://foundation.zurb.com/) Sass, via [Bower](http://bower.io/).
2. [CodeShip](http://codeship.io/), for CI testing and automated deployment to our server
3. [Slack](http://slack.com) configuration sensible preferences, to keep the team updated.


##Quickstart

Install these things on your machine:

1. Install a [Ruby](http://www.ruby-lang.org/en/downloads/) version via RVM. We're using 2.2.1
2. Install [Bundler](http://bundler.io/)
3. Install [Bower](http://bower.io/) (`$ npm install -g bower`)

Then get the app-specific stuff set up:

1. `$ bower install` to install web package dependencies for the project
2. `$ bundle` to install Ruby gems (including Middleman)
3. `$ npm install` to install the node packages we need for Gulp
4. `$ npm install -g gulp` to get Gulp working
5. `$ gulp` to build the CSS for the app
6. `$ middleman s` to start the Middleman server

If you want to edit Sass, and have Middleman reload it for you, use `$ gulp watch` at step #5.

You'll then be able to see the site at [localhost:4567](http://localhost:4567). For more help follow [Middleman's project template instructions](http://middlemanapp.com/getting-started/welcome/).


##Deploying it to Netlify

We used to deploy this site to a regular Linux server, but it was too much hassle. Purpose built static site hosting services like [Netlify](https://www.netlify.com/) are a much better option.

1. Go to Netlify and connect your GitHub account, then select the repository you'd like to deploy
2. In the settings modal, choose which branch you'd like to deploy and leave the **Directory** set to `/tmp`.
3. In the **Build Command** field, enter `npm run build`.

Feel free to set up a password to protect the build and give it a custom URL.

_Netlify automatically looks for `package.json` files, `.gemfiles` and `bower.json`, so there's very little that we actually need to set up.  This build command will run the `build` and `prebuild` tasks configured in the [`package.json`](./package.json)._


##Optionally, configure notifications and connectors

Keep clients and team members updated at every step of the process. We use Slack massively, and pipe lots of notifications into a project room where our team and clients can discuss things.

### Add Slack connections

Configure the following inside Slack > Configure Integrations:

* GitHub > Slack (if desired)
* CodeShip > Slack


##Using this repository as a Middleman template

If you're building lots of new projects with this repo, it'll be easiest if you turn it into a Middleman template. Here's how to do that:

Clone this repo into `~/.middleman` (you'll have to create this directory if it's not already there). You can then use it with the `--template` flag on `middleman init`.

`$ git clone git://github.com/wearehanno/riggings.git ~/.middleman/riggings`

Then create a new project using zurb-foundation template.

1. `$ middleman init my_new_project --template=riggings`
2. `$ cd my_new_project`
3. `$ rm -rf -- .git` to delete the template's git repo, which is copied into this repo too, and you won't want it
