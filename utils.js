'use strict';

var cheerio = require('cheerio');

var utils = {

  createFiles: function(componentPrefix, componentType) {
    var fileTypes = ['.js', '.html', '.css'];
    var componentTemplateName = componentPrefix + '-' + componentType;

    for (var fileType in fileTypes) {
      this.fs.copyTpl(
        // Template file
        this.templatePath(componentTemplateName + fileTypes[fileType]),
        // Destination file
        this.destinationPath(this.component.path + fileTypes[fileType]), {
          componentName: this.component.name
        }
      );
    }
  },

  addImport: function(componentPrefix, componentsType) {
    var componentImports = this.fs.read(this.destinationPath(this.component.sourcePath + '_elements.html'));
    var componentImportsCheerio = cheerio.load(componentImports);

    var componentFileName = componentPrefix + '-' + this.component.name;
    var importLink = '<link rel="import" href="' + componentFileName + '.html"></link>\n';
    var componentTemplate = '_' + componentsType;
    var componentPath = this.component.sourcePath + componentTemplate + '.html';

    componentImportsCheerio.root().append(importLink);

    this.fs.write(this.destinationPath(componentPath), componentImportsCheerio.html());
  }
};

module.exports = utils;
