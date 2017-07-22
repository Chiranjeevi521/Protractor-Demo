"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe("Test Angular Site", () => {
    beforeAll(() => {
        protractor_1.browser.get('https://angularjs.org/');
    });
    it("Test Text Field", () => {
        expect(protractor_1.browser.getTitle()).toBe('AngularJS — Superheroic JavaScript MVW Framework');
    });
    it("Entering the value", function () {
        let name = protractor_1.element(protractor_1.by.model('yourName'));
        name.click();
        name.sendKeys('Chiranjeevi');
        let placedtext = protractor_1.element(protractor_1.by.binding('yourName'));
        expect(placedtext.getText()).toBe('Hello Chiranjeevi!');
    });
    it("Add New TOD", function () {
        let field = protractor_1.element(protractor_1.by.model('todoList.todoText'));
        field.click();
        field.sendKeys('Test TODO');
        protractor_1.element(protractor_1.by.buttonText('add')).click();
        let enteredtext = protractor_1.element(protractor_1.by.cssContainingText('.checkbox', 'Test TODO'));
        expect(enteredtext.getText()).toEqual('Test TODO');
    });
    it("Selecting a Pluralization Pane", function () {
        protractor_1.element(protractor_1.by.cssContainingText('[ng-click="select(pane)"]', 'Pluralization')).click();
        protractor_1.element.all(protractor_1.by.repeater('beerCount in beers')).then(function (ars) {
            for (let i = 2; i < ars.length - 1; i++) {
                let value = ars[i].getText();
                console.log(value);
                //expect(value).toBe(i+" beers");
            }
        });
    });
});
