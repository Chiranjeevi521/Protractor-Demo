import { Config, browser } from "protractor";
import { SpecReporter } from "jasmine-spec-reporter";
let AllureReporter = require('./node_modules/jasmine-allure-reporter/src/Jasmine2AllureReporter.js');

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
    jasmine.getEnv().afterEach((done)=>{
        browser.takeScreenshot().then((png)=>{
          AllureReporter.allure.createAttachment('Screenshot', ()=>{
            return new Buffer(png, 'base64');
          }, 'image/png')();
          done();
        })
    });
  }

}