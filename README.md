
#### Prerequisites
Before you begin, make sure your development environment includes `Node.js®` and an `npm` package manager.

###### Node.js
Angular 11 requires `Node.js` version 10.13 or later.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).

###### Angular CLI
Install the Angular CLI globally using a terminal/console window.
```bash
npm install -g @angular/cli
```

## Installation

``` bash
# go into app's directory
$ cd crmfrontend

# install app's dependencies
$ npm install

# serve with hot reload at localhost:4200.
$ ng serve

# build for production with minification
$ ng build
```

## Architecture

```
crmfrontend/
├── e2e/
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   ├── scss/
│   ├── index.html
│   └── ...
├── .angular-cli.json
├── ...
├── package.json
└── ...
```
## Branch management 

For each ticket, create a branch and in the end of the ticket, 
Make a pull request to develop by specifying the other developers for a code review.

## Documentation

The documentation for the CoreUI Angular Admin Template is hosted at the website [CoreUI](https://coreui.io/angular/)


