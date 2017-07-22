import { by,element,browser } from "protractor";

describe("Test Angular Site", ()=>{

    beforeAll(()=>{

        browser.get('https://angularjs.org/');

    });

    it("Test Text Field", ()=>{

        expect<any>(browser.getTitle()).toBe('AngularJS — Superheroic JavaScript MVW Framework');

    });


    it("Entering the value", function(){

        let name = element(by.model('yourName'));
        name.click();
        name.sendKeys('Chiranjeevi');
        let placedtext = element(by.binding('yourName'));
        expect<any>(placedtext.getText()).toBe('Hello Chiranjeevi!');

    });

    it("Add New TOD", function(){

        let field = element(by.model('todoList.todoText'));
        field.click();
        field.sendKeys('Test TODO');
        element(by.buttonText('add')).click();
        let enteredtext = element(by.cssContainingText('.checkbox','Test TODO'));
        expect<any>(enteredtext.getText()).toEqual('Test TODO');

    });

    it("Selecting a Pluralization Pane", function(){

        element(by.cssContainingText('[ng-click="select(pane)"]','Pluralization')).click();
        element.all(by.repeater('beerCount in beers')).then(function(ars){

            for (let i=2; i<ars.length-1; i++){
                
                let value = ars[i].getText();
                console.log(value);
                //expect(value).toBe(i+" beers");
            }
            
        });

    });

});