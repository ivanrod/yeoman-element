var generators = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your page name',
      default : 'new-page' // Default to current folder name
    }, function (answers) {
      this.component = {
        name: answers.name,
        sourcePath: 'app/pages/',
        path: 'app/pages/' + 'pg-' + answers.name + '/pg-' + answers.name
      };
      done();
    }.bind(this));


  },

  writing: {
    /**
     * Create new files
     */
    newFiles: function () {
      utils.createFiles.call(this, 'pg', 'page');
    },

    /**
     * Modify existing files
     */
    modifiedFiles: function() {
      utils.addImport.call(this, 'pg', 'pages');
    }

      /*****************************************************************
        TODO                                                           *
       -Prompt to add Composite elements: my-element/my-other-element  *
      *****************************************************************/
  }


});
