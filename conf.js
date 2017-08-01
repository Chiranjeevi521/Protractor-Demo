"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
let AllureReporter = require('jasmine-allure-reporter');
exports.config = {
    //seleniumAddress : 'http://localhost:4444/wd/hub',
    directConnect: true,
    framework: "jasmine2",
    specs: ['spec.js'],
    jasmineNodeOpts: {},
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
    }
};
