var generators = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your element name',
      default : 'new-element' // Default to current folder name
    }, function (answers) {
      this.component = {
        name: answers.name,
        sourcePath: 'app/elements/',
        path: 'app/elements/' + 'my-' + answers.name + '/my-' + answers.name
      };
      done();
    }.bind(this));


  },

  writing: {
    /**
     * Create new files
     */
    newFiles: function () {
      utils.createFiles.call(this, 'my', 'element');
    },

    /**
     * Modify existing files
     */
    modifiedFiles: function() {
      utils.addImport.call(this, 'my', 'elements');
    }

      /*****************************************************************
        TODO                                                           *
       -Add pages                                                      *
       -Add layouts                                                    *
       -Prompt to add Composite elements: my-element/my-other-element  *
      *****************************************************************/
  }


});
