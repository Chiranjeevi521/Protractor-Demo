import { element } from 'protractor/built';
import { ElementHelper } from "../util/elementhelper";

export class SupercalculatorMainPage {

    ele = new ElementHelper();

    public addition(aFirst:number, aSecond:number){

        let firstnumber = this.ele.firstNumber();
        firstnumber.click();
        firstnumber.sendKeys(aFirst);
        let secondnumber = this.ele.secondNumber();
        secondnumber.click();
        secondnumber.sendKeys(aSecond);
        this.ele.goButton().click();

    };

}