# HANSON GHOST EDITOR

*~ Behavior authoring tool ~*


## Requirements

To run the editor you will need the following softwares:

- [NodeJS](https://nodejs.org)
- [Bower](http://bower.io)

Before building, you need to install some 3rd-party libraries. You need to run in console the following commands:

    npm install

and:

    bower install

The former installs a bunch of NodeJS modules, which are used on the building system and some dependences of the desktop application. The last installs CSS and Javascript vendor libraries.


## Building during development

During development you can run the editor in a web browser with automatically building and reloading:

    gulp serve

which will run a web server hosted on `http://127.0.0.1:8000`.


## Deployment

Run:

    gulp build

and just use the `build` folder content.