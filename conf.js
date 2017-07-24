"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
let AllureReporter = require('./node_modules/jasmine-allure-reporter/src/Jasmine2AllureReporter.js');
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
        jasmine.getEnv().afterEach((done) => {
            protractor_1.browser.takeScreenshot().then((png) => {
                AllureReporter.allure.createAttachment('Screenshot', () => {
                    return new Buffer(png, 'base64');
                }, 'image/png')();
                done();
            });
        });
    }
};
