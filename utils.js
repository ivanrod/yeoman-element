'use strict';

var cheerio = require('cheerio');

var utils = {

  createFiles: function(componentPrefix, componentType) {
    var fileTypes = ['.js', '.html', '.css'];
    var componentTemplateName = componentPrefix + '-' + componentType;
    var componentName = componentPrefix + '-' + this.component.name;

    for (var fileType in fileTypes) {
      this.fs.copyTpl(
        // Template file
        this.templatePath(componentTemplateName + fileTypes[fileType]),
        // Destination file
        this.destinationPath(this.component.path + fileTypes[fileType]), {
          componentName: componentName
        }
      );
    }
  },

  addImport: function(componentPrefix, componentsType) {
    var componentFileName = componentPrefix + '-' + this.component.name;
    var componentTemplate = '_' + componentsType;
    var componentPath = this.component.sourcePath + componentTemplate + '.html';

    var componentImports = this.fs.read(this.destinationPath(componentPath));
    var componentImportsCheerio = cheerio.load(componentImports);
    var importLink = '<link rel="import" href="' + componentFileName + '/' + componentFileName + '.html"></link>\n';

    componentImportsCheerio.root().append(importLink);

    this.fs.write(this.destinationPath(componentPath), componentImportsCheerio.html());
  }
};

module.exports = utils;
