# wim_angular
> Contains base typescript models and services for WiM.
> 
> Source typescript files in /src
> Distribution javascript files in /dist

## Project setup

##### required software
[node.js](http://nodejs.org)  
[git](https://git-scm.com/)  
[typescript 1.7] (https://github.com/Microsoft/TypeScript)

#### 1.  Install global dependencies
This will install the following packages globally

```bash
npm install -g bower
npm install -g gulp
npm install -g typings
```

#### 2.  Update/add packages
This will install the required dependencies to the project

Inside of your project folder (after git fork and clone):
```bash
npm install
bower install
typings install 
```
------

##Use

You will need to require WiM.Services, WiM.Event and wim_angular services dependencies at your app root level. Note that these are in addition to any angular dependencies you would need.

```
var app = angular.module("myApp", ['WiM.Services', 'WiM.Event', 'wim_angular']);
```



##Editing this package

Edits must be made in the base typescript files in the src folder. Please use typescript transpiler version 1.7 We have learned that v1.8 seems to output poorly-formatted IIFE statements that break the package in the browser.

After editing the TypeScript and transpiling it to JavaScript, run the gulp task `gulp build` to copy the transpiled JS to the dist folder.

####Editing the examples
Examples are in the examples directory at the package root. These examples are designed to display the modules of wim_angular project in an easy-to-digest single-page application. Currently only wimLegend has an example.




> Written with [StackEdit](https://stackedit.io/).
