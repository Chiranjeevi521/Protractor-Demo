import { by,element,browser } from "protractor";
var using = require('jasmine-data-provider');
import { DataProvider } from "../data_provider/dataprovider";
import { readFile, read, ColInfo, RowInfo } from "xlsx";
//import { customlocator } from "./customlocators";
import { log } from "winston";
import { SupercalculatorMainPage } from "../pages/SupercalculatorMainPage";
import { ElementHelper } from "../util/elementhelper";

describe("Go to super calculator and test addition", ()=>{

        beforeAll(()=>{

            browser.get('https://juliemr.github.io/protractor-demo/');
        });

        //let data1:string = "./numbers.json";
        //let data2 = JSON.parse(data1);

        let dataprovider = new DataProvider();
        let plusProvider = dataprovider.plusProvider()

        let calculatormainpage = new SupercalculatorMainPage();

        let elementhelper = new ElementHelper();

        

        using(plusProvider,(data)=>{

            it("Supercalculator Addition", ()=>{

                calculatormainpage.addition(data.a,data.b)
                browser.sleep(6000);
                expect<any>(elementhelper.resultText().getText()).toEqual(data.expected);

            });
  
        });

        // reading data from excel file 


        //using(plusProvider,(data)=>{

        it("Supercalculator addition using excel data", ()=>{

            browser.sleep(5000);
            let workbook = readFile('./data_provider/test.xlsx');
            let sheetname = 'Test_Data';
            let target = workbook.Sheets[sheetname];
            for ( var i=2; i<14; i++){
                let finalresult = String(target["C"+i].v);
                calculatormainpage.addition(target["A"+i].v, target["B"+i].v)
                expect<any>(elementhelper.resultText().getText()).toEqual(finalresult);
            }

        });
  
        //});

    });