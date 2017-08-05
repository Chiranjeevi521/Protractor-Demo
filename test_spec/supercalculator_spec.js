"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
var using = require('jasmine-data-provider');
const dataprovider_1 = require("../data_provider/dataprovider");
const xlsx_1 = require("xlsx");
const SupercalculatorMainPage_1 = require("../pages/SupercalculatorMainPage");
const elementhelper_1 = require("../util/elementhelper");
describe("Go to super calculator and test addition", () => {
    beforeAll(() => {
        protractor_1.browser.get('https://juliemr.github.io/protractor-demo/');
    });
    //let data1:string = "./numbers.json";
    //let data2 = JSON.parse(data1);
    let dataprovider = new dataprovider_1.DataProvider();
    let plusProvider = dataprovider.plusProvider();
    let calculatormainpage = new SupercalculatorMainPage_1.SupercalculatorMainPage();
    let elementhelper = new elementhelper_1.ElementHelper();
    using(plusProvider, (data) => {
        xit("Supercalculator Addition", () => {
            calculatormainpage.addition(data.a, data.b);
            protractor_1.browser.sleep(6000);
            expect(elementhelper.resultText().getText()).toEqual(data.expected);
        });
    });
    // reading data from excel file 
    //using(plusProvider,(data)=>{
    it("Supercalculator addition using excel data", () => {
        protractor_1.browser.sleep(5000);
        let workbook = xlsx_1.readFile('./data_provider/test.xlsx');
        let sheetname = 'Test_Data';
        let target = workbook.Sheets[sheetname];
        for (var i = 2; i < 14; i++) {
            let finalresult = String(target["C" + i].v);
            calculatormainpage.addition(target["A" + i].v, target["B" + i].v);
            expect(elementhelper.resultText().getText()).toEqual(finalresult);
        }
    });
    //});
});
//# sourceMappingURL=supercalculator_spec.js.map