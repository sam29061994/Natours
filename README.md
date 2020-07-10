# NATOURS API 
NATOURS is based on Node.js, Express and MongoDB stack. This demo Api helps a tourism business with managing the tours/users/reviews etc. This RESTfulAPI comes with authentication, security, data filtering,sorting.aliasing, geospatial queries, aggregation pipeline etc. 

## Teachnologies used in this API

Node.js, core modules and NPM (Node Package Manager)

Express (Node.js framework): routing, middleware, sending responses, etc.

RESTful API design and development with advanced features: filtering, sorting, aliasing, pagination

CRUD operations with MongoDB database locally and on the Atlas platform (in the cloud)

Advanced MongoDB: geospatial queries, aggregation pipeline, and operators

Mongoose (MongoDB JS driver): Data models, CRUD operations, data validation, and middleware

Advanced Mongoose features: modeling geospatial data, populates, virtual populates, indexes, etc.

Using the MVC (Model-View-Controller) architecture

Advanced data modelling: relationships between data, embedding, referencing, and more

Complete modern authentication with JWT: user sign up, log in, password reset, secure cookies, etc.

Authorization (user roles)

Security: best practices, encryption, sanitization, rate limiting, etc.

Sending emails with Mailtrap

Advanced error handling workflows



## API Documentation
https://documenter.getpostman.com/view/9494621/SztA78zt



---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Running the project in development

    $ yarn start:dev / npm start:dev

## Simple build for production

    $ yarn start:prod / npm start:prod

## Debug the project with Node debugger

$ yarn run debug / npm run debug

