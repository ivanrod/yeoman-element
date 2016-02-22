var generators = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  initializing: function() {
    // Initializing options
  },

  prompting: function() {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'path',
      message: 'Your route path',
      default: 'new-route' // Default to current folder name
    }, {
      type: 'list',
      name: 'page',
      message: 'Your route page',
      choices: pages
    }], function(answers) {
      this.component = {
        name: answers.name,
        sourcePath: 'app/routes/',
        path: 'app/pages/' + 'pg-' + answers.name + '/pg-' + answers.name
      };
      done();
    }.bind(this));

  },

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

  writing: {
    /**
     * Create new files
     */
    newFiles: function() {
      utils.createFiles.call(this, 'pg', 'page');
    },

    /**
     * Modify existing files
     */
    modifiedFiles: function() {
      utils.addImport.call(this, 'pg', 'pages');
    }
  }


});
