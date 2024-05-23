![WiM](wimlogo.png)

Update, 2024-05-22: Deprecated

This repository has been has moved to a different hosting platform and is no longer being actively maintained. Please see https://code.usgs.gov/WiM/wim_angular (USGS internal access may be required) for latest updates related to this effort.

# wim_angular

wim_angular is a collection of custom reusable angularjs libraries and objects.

### Prerequisites

[node.js](http://nodejs.org)
[git](https://git-scm.com/)
[typescript 1.7] (https://github.com/Microsoft/TypeScript)

#### 1.  Install global dependencies
This will install the following packages globally

```
npm install -g gulp
npm install -g typescript@~1.7
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

https://help.github.com/articles/cloning-a-repository/

This will install the required dependencies to the project

Inside of your project folder (after git fork and clone):
```
npm install
typings install
```


##Use

You will need to require WiM.Services, WiM.Event and wim_angular services dependencies at your app root level. Note that these are in addition to any angular dependencies you would need.

```
var app = angular.module("myApp", ['WiM.Services', 'WiM.Event', 'wim_angular']);
```

Your app will also need jquery and bootstrap as dependencies. Map applications are based on leaflet, [angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive)(tombatossals version), and [esri-leaflet](https://github.com/Esri/esri-leaflet) for the agsDynamic and agsFeature types addressed in wimLegend.




##Editing this package

Edits must be made in the base typescript files in the src folder. Please use typescript transpiler version 1.7 We have learned that v1.8 seems to output poorly-formatted IIFE statements that break the package in the browser.

To transpile, run `tsc`. If that doesn't work, try `tsc --init` first.

After editing the TypeScript and transpiling it to JavaScript, run the gulp task `gulp build` to copy the transpiled JS to the dist folder.

####Editing the examples
Examples are in the examples directory at the package root. These examples are designed to display the modules of wim_angular project in an easy-to-digest single-page application. Currently only wimLegend has an example.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests to us. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on adhering by the [USGS Code of Scientific Conduct](https://www2.usgs.gov/fsp/fsp_code_of_scientific_conduct.asp).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](../../tags). 

Advance the version when adding features, fixing bugs or making minor enhancement. Follow semver principles. To add tag in git, type git tag v{major}.{minor}.{patch}. Example: git tag v2.0.5

To push tags to remote origin: `git push origin --tags`

*Note that your alias for the remote origin may differ.

## Authors

* **[Jeremy Newson](https://www.usgs.gov/staff-profiles/jeremy-k-newson)**  - *Lead Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)

See also the list of [contributors](../../graphs/contributors) who participated in this project.

## License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details

## Suggested Citation

In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`


## About WIM

* This project authored by the [USGS WIM team](https://wim.usgs.gov)
* WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.
* WiM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).
