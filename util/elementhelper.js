"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class ElementHelper {
    firstNumber() {
        return protractor_1.element(protractor_1.by.model('first'));
    }
    ;
    secondNumber() {
        return protractor_1.element(protractor_1.by.model('second'));
    }
    goButton() {
        return protractor_1.element(protractor_1.by.partialButtonText('Go'));
    }
    resultText() {
        return protractor_1.element(protractor_1.by.tagName('h2'));
    }
}
exports.ElementHelper = ElementHelper;
//# sourceMappingURL=elementhelper.js.map