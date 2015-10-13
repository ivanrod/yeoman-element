var generators = require('yeoman-generator');

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

  writing: function () {

    var fileTypes = ['.js', '.html', '.css'];

    for (var fileType in fileTypes) {
      this.fs.copyTpl(
        this.templatePath('my-element' + fileTypes[fileType]),
        this.destinationPath('elements/my-' + this.elementName + '/my-' + this.elementName + fileTypes[fileType]),
        { elementName: this.elementName }
      );
    }

    // TODO:
    // -Add to _elements.html
    // -Prompt to optional <import> addition in pages
    // -Prompt to add Composite elements: my-element/my-other-element/
  }

});
