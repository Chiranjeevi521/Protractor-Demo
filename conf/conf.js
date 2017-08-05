"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
const util_1 = require("util");
const child_process_1 = require("child_process");
let AllureReporter = require('jasmine-allure-reporter');
exports.config = {
    //seleniumAddress : 'http://localhost:4444/wd/hub',
    directConnect: true,
    framework: "jasmine2",
    specs: ['../test_spec/**_spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    },
    onPrepare: function () {
        jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            protractor_1.browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64');
                }, 'image/png')();
                done();
            });
        });
    },
    onComplete: function () {
        let stdout;
        let stderr;
        let error;
        console.log('Sending test result as email');
        util_1.puts(error, stdout, stderr);
        child_process_1.exec('node ../util/mail.js', util_1.puts);
    }
};
//# sourceMappingURL=conf.js.map