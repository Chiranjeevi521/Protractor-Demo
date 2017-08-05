import { element,by,browser } from "protractor";

export class ElementHelper {

    firstNumber() {

        return element(by.model('first'));

    };

    secondNumber() {

        return element(by.model('second'));
    }

    public goButton() {

        return element(by.partialButtonText('Go'));
    }

    public resultText() {

        return element(by.tagName('h2'));
    }

}