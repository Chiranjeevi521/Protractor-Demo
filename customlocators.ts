import { Locator, ProtractorBy } from 'protractor/built/locators';
import { by } from "protractor";

export let  Customlocator() => {

	by.addLocator('ngClick', (toState,parentelement)=>{

		let using = parentelement || document ;
		let prefixes = ['ng-click'];
	      for (var p = 0; p < prefixes.length; ++p) {
	          var selector = '*[' + prefixes[p] + '="' + toState + '"]';
	          var inputs = using.querySelectorAll(selector);
	          if (inputs.length) {
	              return inputs;
	          }
	      }		

	},
}