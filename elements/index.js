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
      this.elementName = answers.name;
      done();
    }.bind(this));
  },

  writing: {
    newFiles: function () {

      var fileTypes = ['.js', '.html', '.css'];

      // Create new files
      for (var fileType in fileTypes) {
        this.fs.copyTpl(
          this.templatePath('my-element' + fileTypes[fileType]),
          this.destinationPath('elements/my-' + this.elementName + '/my-' + this.elementName + fileTypes[fileType]),
          { elementName: this.elementName }
        );
      }

    },

    modifiedFiles: function() {
      // Modify existing files
      var elementsImports = this.fs.read(this.destinationPath('elements/_elements.html'));
      var elementsImportsCheerio = cheerio.load(elementsImports);
      var importSelector = elementsImportsCheerio('import');
      importSelector.after('<import src="new-element.html"></import>');
      console.log(elementsImportsCheerio.html());
    }

      /*****************************************************************
        TODO                                                           *
       -Add to _elements.html                                          *
       -Prompt to optional <import> addition in pages                  *
       -Prompt to add Composite elements: my-element/my-other-element  *
      *****************************************************************/
  }


});
