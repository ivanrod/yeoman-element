var generators = require('yeoman-generator');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your layout name',
      default : 'new-layout' // Default to current folder name
    }, function (answers) {
      this.component = {
        name: answers.name,
        sourcePath: 'app/layouts/',
        path: 'app/layouts/' + 'ly-' + answers.name + '/ly-' + answers.name
      };
      done();
    }.bind(this));


  },

  writing: {
    /**
     * Create new files
     */
    newFiles: function () {
      utils.createFiles.call(this, 'ly', 'layout');
    },

    /**
     * Modify existing files
     */
    modifiedFiles: function() {
      utils.addImport.call(this, 'ly', 'layouts');
    }

      /*****************************************************************
        TODO                                                           *
       -Add pages                                                      *
       -Add layouts                                                    *
       -Prompt to add Composite elements: my-element/my-other-element  *
      *****************************************************************/
  }


});
