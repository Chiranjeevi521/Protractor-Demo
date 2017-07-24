import { by,element,browser } from "protractor";
var using = require('jasmine-data-provider');
import { DataProvider } from "./dataprovider";
import { readFile, read, ColInfo, RowInfo } from "xlsx";
import { customlocator } from "./customlocators";
import { log } from "winston";

describe("Test Angular Site", ()=>{


    beforeAll(()=>{

       browser.get('https://angularjs.org/');

    });

    it("Test Text Field", ()=>{

        expect<any>(browser.getTitle()).toBe('AngularJS — Superheroic JavaScript MVW Framework');
        log("info",'Successfully verified title');

    });


    it("Entering the value", function(){

        let name = element(by.model('yourName'));
        name.click();
        name.sendKeys('Chiranjeevi');
        let placedtext = element(by.binding('yourName'));
        expect<any>(placedtext.getText()).toBe('Hello Chiranjeevi!');
        log("info",'Successfully verified Hello Chiranjeevi');

    });

    it("Add New TOD", function(){

        let field = element(by.model('todoList.todoText'));
        field.click();
        field.sendKeys('Test TODO');
        element(by.buttonText('add')).click();
        let enteredtext = element(by.cssContainingText('.checkbox','Test TODO'));
        expect<any>(enteredtext.getText()).toEqual('Test TODO');

    });

    xit("Selecting a Pluralization Pane", function(){


        element(by.cssContainingText('[ng-click="select(pane)"]','Pluralization')).click();
        element.all(by.repeater('beerCount in beers')).then(function(ars){

            for (let i=2; i<ars.length-1; i++){
                
                let value = ars[i].getText();
                console.log(value);
                //expect(value).toBe(i+" beers");
            }
            
        });

    });

    xdescribe("Go to super calculator and test addition", ()=>{

        beforeAll(()=>{

            browser.get('https://juliemr.github.io/protractor-demo/');
        });

        //let data1:string = "./numbers.json";
        //let data2 = JSON.parse(data1);

        let dataprovider = new DataProvider();
        let plusProvider = dataprovider.plusProvider()
        

        using(plusProvider,(data)=>{

            it("Supercalculator Addition", ()=>{

                element(by.model('first')).sendKeys(data.a);
                element(by.model('second')).sendKeys(data.b);
                element(by.buttonText('Go!')).click();
                browser.sleep(6000);
                expect<any>(element(by.tagName('h2')).getText()).toEqual(data.expected);

            });
  
        });

        // reading data from excel file 


        //using(plusProvider,(data)=>{

        it("Supercalculator addition using excel data", ()=>{

            browser.sleep(5000);
            let workbook = readFile('test.xlsx');
            let sheetname = 'Test_Data';
            let target = workbook.Sheets[sheetname];
            for ( var i=2; i<14; i++){
                let finalresult = String(target["C"+i].v);
                element(by.model('first')).sendKeys(target["A"+i].v);
                element(by.model('second')).sendKeys(target["B"+i].v);
                element(by.buttonText('Go!')).click();
                expect<any>(element(by.tagName('h2')).getText()).toEqual(finalresult);
            }

        });
  
        //});

    });

});