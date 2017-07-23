"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var using = require('jasmine-data-provider');
class DataProvider {
    plusProvider() {
        return [
            { a: 2, b: 3, expected: '5' },
            { a: '14', b: 15, expected: '29' },
            { a: 12, b: '13', expected: '25' },
            { a: '22', b: '13', expected: '35' },
        ];
    }
}
exports.DataProvider = DataProvider;
