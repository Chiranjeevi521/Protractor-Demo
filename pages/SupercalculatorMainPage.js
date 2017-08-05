"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementhelper_1 = require("../util/elementhelper");
class SupercalculatorMainPage {
    constructor() {
        this.ele = new elementhelper_1.ElementHelper();
    }
    addition(aFirst, aSecond) {
        let firstnumber = this.ele.firstNumber();
        firstnumber.click();
        firstnumber.sendKeys(aFirst);
        let secondnumber = this.ele.secondNumber();
        secondnumber.click();
        secondnumber.sendKeys(aSecond);
        this.ele.goButton().click();
    }
    ;
}
exports.SupercalculatorMainPage = SupercalculatorMainPage;
//# sourceMappingURL=SupercalculatorMainPage.js.map