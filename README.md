# JSON Content Generator

This is a generic solution for dynamically generating JSON output. 

It has an ADMIN area where admins can create Menus and Fields and a USER area where owners can fill their own applications with data.

This Web application is composed of 3 parts: 

- Admin: used by the system administrator, to create all the fields the app is going to have, including text, images and dates. 
- Owner: used by the owner of the app so he or she can add contents, using the fields created by the sysadmin. 
- JSON rest service: Used to automatically generate a JSON output, with the contents generated by the owner.

## About

This project was developed using MEAN stack. 
Frontend: Angular 6 and Angular Material.
Backend: Node.js, Express, MongoDB, Mongoose

## Prerequisites
Ensure that you have the following installed on your local machine:

* Heroku [CLI](https://devcenter.heroku.com/articles/heroku-cli)
* [Node.js](https://nodejs.org/en/download/) version 4 or higher

Clone this git repository
```
git clone https://github.com/bergergit/content-generator.git
cd content-generator
```

## Server deployment

The following instructions will show how to install this stack in Heroku. 

Make sure you have 


To deploy this app in Heroku:

```
heroku create my-content-generator
heroku addons:create mongolab
```

## To debug locally

_Make sure you have Angular CLI installed:_
```
npm install -g @angular/cli
```

In a terminal window, serve the Angular app with:

```
npm install
ng serve --open
```

Serve and watch Node.js.

Run commands below, each in a terminal window:
```
npm run watch-ts
```
```
export NODE_ENV=dev
npm run watch-node
```