import { Config, browser } from "protractor";
import { SpecReporter } from "jasmine-spec-reporter";
import { puts } from "util";
import { exec, ChildProcess } from "child_process";
let AllureReporter = require('jasmine-allure-reporter');

export let config:Config = {

    //seleniumAddress : 'http://localhost:4723/wd/hub', Use 4723 for appium and 4444 for selenium web server
    directConnect : true,
    framework :"jasmine2",
    specs : ['../test_spec/**_spec.js'],
    jasmineNodeOpts : {
      defaultTimeoutInterval : 60000
    },

    capabilities : {

      browserName : "chrome",
      //platformName : 'android',
      //deviceName: "HT49TW901121"
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
  },

  onComplete : function () {

    let stdout:ChildProcess.stdout;
    let stderr:ChildProcess.stderr;
    let error: ChildProcess.error;

    console.log ('Sending test result as email');
    puts(error, stdout,stderr);
    exec('node ./util/mail.js', puts);
  }

}