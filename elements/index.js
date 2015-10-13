var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  destination: function () {
    console.log('method 1 just ran', this.templatePath());
  }
});
