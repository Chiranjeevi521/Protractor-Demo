"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
function customlocator() {
    protractor_1.by.addLocator('ngClick', (toState, parentelement) => {
        let using = parentelement || document;
        let prefixes = ['ng-click'];
        for (var p = 0; p < prefixes.length; ++p) {
            var selector = '*[' + prefixes[p] + '="' + toState + '"]';
            var inputs = using.querySelectorAll(selector);
            if (inputs.length) {
                return inputs;
            }
        }
    });
}
exports.customlocator = customlocator;
