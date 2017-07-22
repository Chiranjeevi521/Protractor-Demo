"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: "jasmine",
    specs: ['spec.js'],
    jasmineNodeOpts: {},
    onPrepare: function () {
        jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
    }
};
