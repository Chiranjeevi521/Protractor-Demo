"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
var using = require('jasmine-data-provider');
const dataprovider_1 = require("./dataprovider");
const xlsx_1 = require("xlsx");
describe("Test Angular Site", () => {
    beforeAll(() => {
        // browser.get('https://angularjs.org/');
    });
    xit("Test Text Field", () => {
        expect(protractor_1.browser.getTitle()).toBe('AngularJS — Superheroic JavaScript MVW Framework');
    });
    xit("Entering the value", function () {
        let name = protractor_1.element(protractor_1.by.model('yourName'));
        name.click();
        name.sendKeys('Chiranjeevi');
        let placedtext = protractor_1.element(protractor_1.by.binding('yourName'));
        expect(placedtext.getText()).toBe('Hello Chiranjeevi!');
    });
    xit("Add New TOD", function () {
        let field = protractor_1.element(protractor_1.by.model('todoList.todoText'));
        field.click();
        field.sendKeys('Test TODO');
        protractor_1.element(protractor_1.by.buttonText('add')).click();
        let enteredtext = protractor_1.element(protractor_1.by.cssContainingText('.checkbox', 'Test TODO'));
        expect(enteredtext.getText()).toEqual('Test TODO');
    });
    xit("Selecting a Pluralization Pane", function () {
        protractor_1.element(protractor_1.by.cssContainingText('[ng-click="select(pane)"]', 'Pluralization')).click();
        protractor_1.element.all(protractor_1.by.repeater('beerCount in beers')).then(function (ars) {
            for (let i = 2; i < ars.length - 1; i++) {
                let value = ars[i].getText();
                console.log(value);
                //expect(value).toBe(i+" beers");
            }
        });
    });
    describe("Go to super calculator and test addition", () => {
        beforeAll(() => {
            protractor_1.browser.get('https://juliemr.github.io/protractor-demo/');
        });
        //let data1:string = "./numbers.json";
        //let data2 = JSON.parse(data1);
        let dataprovider = new dataprovider_1.DataProvider();
        let plusProvider = dataprovider.plusProvider();
        using(plusProvider, (data) => {
            xit("Supercalculator Addition", () => {
                protractor_1.element(protractor_1.by.model('first')).sendKeys(data.a);
                protractor_1.element(protractor_1.by.model('second')).sendKeys(data.b);
                protractor_1.element(protractor_1.by.buttonText('Go!')).click();
                protractor_1.browser.sleep(6000);
                expect(protractor_1.element(protractor_1.by.tagName('h2')).getText()).toEqual(data.expected);
            });
        });
        // reading data from excel file 
        //using(plusProvider,(data)=>{
        xit("Supercalculator addition using excel data", () => {
            let workbook = xlsx_1.readFile('test.xlsx');
            let sheetname = 'Test_Data';
            let target = workbook.Sheets[sheetname];
            for (var i = 2; i < 15; i++) {
                let finalresult = String(target["C" + i].v);
                protractor_1.element(protractor_1.by.model('first')).sendKeys(target["A" + i].v);
                protractor_1.element(protractor_1.by.model('second')).sendKeys(target["B" + i].v);
                protractor_1.element(protractor_1.by.buttonText('Go!')).click();
                expect(protractor_1.element(protractor_1.by.tagName('h2')).getText()).toEqual(finalresult);
            }
            protractor_1.browser.sleep(5000);
        });
        //});
    });
    describe('Angular Home Test', function () {
        it("excel", function () {
            protractor_1.browser.get("http://www.way2automation.com/angularjs-protractor/registeration/#/login");
            protractor_1.element(protractor_1.by.model("Auth.user.name")).sendKeys("angular");
            protractor_1.element(protractor_1.by.model("Auth.user.password")).sendKeys("password");
            protractor_1.element(protractor_1.by.model("model[options.key]")).sendKeys("Raman");
            protractor_1.element(protractor_1.by.ngClick('Auth.login()')).click();
            protractor_1.browser.sleep(2000);
        });
    });
});
