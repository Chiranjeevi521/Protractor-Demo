import { Config } from "protractor";
import { SpecReporter } from "jasmine-spec-reporter";

export let config:Config = {

    //seleniumAddress : 'http://localhost:4444/wd/hub',
    directConnect : true,
    framework :"jasmine",
    specs : ['spec.js'],
    jasmineNodeOpts : {

    },

    onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }

}