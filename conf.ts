import { Config, browser } from "protractor";
import { SpecReporter } from "jasmine-spec-reporter";
let AllureReporter = require('jasmine-allure-reporter');

export let config:Config = {

    //seleniumAddress : 'http://localhost:4444/wd/hub',
    directConnect : true,
    framework :"jasmine2",
    specs : ['spec.js'],
    jasmineNodeOpts : {

    },

    onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));

    jasmine.getEnv().addReporter(new AllureReporter({
    resultsDir: 'allure-results'
    }));
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }

}