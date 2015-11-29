var generators = require('yeoman-generator');
var cheerio = require('cheerio');

module.exports = generators.Base.extend({

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your element name',
      default : 'new-element' // Default to current folder name
    }, function (answers) {
      this.element = {
        name: answers.name,
        path: 'elements/my-' + answers.name + '/my-' + answers.name
      };
      done();
    }.bind(this));


  },

  writing: {
    /**
     * Create new files
     */
    newFiles: function () {

      var fileTypes = ['.js', '.html', '.css'];

      for (var fileType in fileTypes) {
        this.fs.copyTpl(
          // Template file
          this.templatePath('my-element' + fileTypes[fileType]),
          // Destination file
          this.destinationPath(this.element.path + fileTypes[fileType]),
          { elementName: this.element.name }
        );
      }

    },

    /**
     * Modify existing files
     */
    modifiedFiles: function() {
      var elementsImports = this.fs.read(this.destinationPath('elements/_elements.html'));
      var elementsImportsCheerio = cheerio.load(elementsImports);
      var importSelector = elementsImportsCheerio('import');
      importSelector.after('<import src="new-element.html"></import>');
      console.log(elementsImportsCheerio.html());
      this.fs.write(this.destinationPath('elements/_elements.html'), elementsImportsCheerio.html());
    }

      /*****************************************************************
        TODO                                                           *
       -Add to _elements.html                                          *
       -Prompt to optional <import> addition in pages                  *
       -Prompt to add Composite elements: my-element/my-other-element  *
      *****************************************************************/
  }


});
