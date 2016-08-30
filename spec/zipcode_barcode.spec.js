/**
 * Created by wangqi on 16-8-1.
 */
'use strict';
const num = require("../src/zipcode_barcode");
/*global require,describe,it,expect*/
describe("isValidBarCodeFormat",function(){
    it("should return boolean",function(){
        let barcodes = "| |:|:: :|:|: |:::| |";
        let result = true;
        expect(num.isValidBarCodeFormat(barcodes)).toEqual(result);
    });
    it("should return boolean",function(){
        let barcodes = "|:::|";
        let result = false;
        expect(num.isValidBarCodeFormat(barcodes)).toEqual(result);
    });
});
describe("isValidBarcodeContent",function(){
    it("should return boolean",function(){
        let barcodes = "| |:|:: :|:|: |:::| |";
        let result = true;
        expect(num.isValidBarCodeContent(barcodes)).toEqual(result);
    });
    it("should return boolean",function(){
        let barcodes = "| |2::";
        let result = false;
        expect(num.isValidBarCodeContent(barcodes)).toEqual(result);
    });
});
describe("isValidBarCodeLength",function(){
    it("should return boolean",function(){
        let barcodes = "| |:|:: :|:|: |:::| |";
        let result = true;
        expect(num.isValidBarCodeLength(barcodes)).toEqual(result);
    });

    it("should return boolean",function(){
        let barcodes = "|:|";
        let result = false;
        expect(num.isValidBarCodeLength(barcodes)).toEqual(result);
    });
});
describe("isValidBarCode",function(){
    it("should return boolean",function(){
        let barcodes = "| |:|:: :|:|: |:::| |";
        let result = true;
        expect(num.isValidBarCode(barcodes)).toEqual(result);
    });
    it("should return boolean",function(){
        let barcodes = "|:: :|3|: |:::| |";
        let result = false;
        expect(num.isValidBarCode(barcodes)).toEqual(result);
    });
});
describe("getZipcodeArr",function(){
    it("should return zipcodeArr",function(){
        let barcodes = "| |:|:: :|:|: |:::| :::|| ::||: :|:|: |";
        let referedLists = [
            {zipcode: "1", barcode: ":::||"},
            {zipcode: "2", barcode: "::|:|"},
            {zipcode: "3", barcode: "::||:"},
            {zipcode: "4", barcode: ":|::|"},
            {zipcode: "5", barcode: ":|:|:"},
            {zipcode: "6", barcode: ":||::"},
            {zipcode: "7", barcode: "|:::|"},
            {zipcode: "8", barcode: "|::|:"},
            {zipcode: "9", barcode: "|:|::"},
            {zipcode: "0", barcode: "||:::"}
        ];
        let zipcodeArr = ["9","5","7","1","3","5"];
        expect(num.getZipCodeArr(barcodes,referedLists)).toEqual(zipcodeArr);
    });
});
describe("isValidCheckDigit",function(){
    it("should return zipcodeArr",function(){
        let zipcodeArr = ["9","5","7","1","3","5"];
        let result = true;
        expect(num.isValidCheckDigit(zipcodeArr)).toEqual(result);
    });
});
describe("formatedZipCode",function(){
    it("should return boolean",function(){
        let boolean = true;
        let zipcodeArr = ["9","5","7","1","3","5"];
        let zipcodeStr = "95713";
        expect(num.formatedZipCode(zipcodeArr,boolean)).toEqual(zipcodeStr);
    });
    it("should return boolean",function(){
        let boolean = true;
        let zipcodeArr = ["1","2","3","4","5","6","7","8","9","5"];
        let zipcodeStr = "12345-6789";
        expect(num.formatedZipCode(zipcodeArr,boolean)).toEqual(zipcodeStr);
    });
});



describe("isValidZipCodeLength",function(){
    it("should return boolean",function(){
        let zipcode = "123456785";
        let result = true;
        expect(num.isValidZipCodeLength(zipcode)).toEqual(result);
    });
    it("should return boolean",function(){
        let zipcode = "123";
        let result = false;
        expect(num.isValidZipCodeLength(zipcode)).toEqual(result);
    });
});
describe("isValidZipCodeSymbol",function(){
    it("should return boolean",function(){
        let zipcode = "1234-5-6785";
        let result = true;
        expect(num.isValidZipCodeSymbol(zipcode)).toEqual(result);
    });
    it("should return boolean",function(){
        let zipcode = "1***23";
        let result = false;
        expect(num.isValidZipCodeSymbol(zipcode)).toEqual(result);
    });
});
describe("isValid_Location",function(){
    it("should return boolean",function(){
        let zipcpde = "12345-6789";
        let result = true;
        expect(num.isValid_Location(zipcpde)).toEqual(result);
    });
    it("should return boolean",function(){
        let zipcpde = "123-456789";
        let result = false;
        expect(num.isValid_Location(zipcpde)).toEqual(result);
    });
});
describe("isValidZipCode",function(){
    it("should return boolean",function(){
        let zipcode = "12345-6785";
        let result = true;
        expect(num.isValidZipCode(zipcode)).toEqual(result);
    });
    it("should return boolean",function(){
        let zipcode = "1*23";
        let result = false;
        expect(num.isValidZipCode(zipcode)).toEqual(result);
    });
});
describe("toTransformStr",function(){
    it("should return zipcodeStr",function(){
        let zipcode = "12345-6785";
        let zipcodeStr = ["1","2","3","4","5","6","7","8","5"];
        expect(num.toTransformStr(zipcode)).toEqual(zipcodeStr);
    });
});
describe("calculateCheckDigit",function(){
    it("should return zipcodeAndCheckDigit",function(){
        let zipcodeStr = ["1","2","3","4","5","6","7","8","5"];
        let zipcodeAndCheckDigit = ["1","2","3","4","5","6","7","8","5","9"];
        expect(num.calculateCheckDigit(zipcodeStr)).toEqual(zipcodeAndCheckDigit);
    });
});
describe("getBarCodeArr",function(){
    it("should return barcodes",function(){
        let zipcodeAndCheckDigit = ["1","2","3","4","5","6","7","8","5","9"];
        let referedLists = [
            {zipcode: "1", barcode: ":::||"},
            {zipcode: "2", barcode: "::|:|"},
            {zipcode: "3", barcode: "::||:"},
            {zipcode: "4", barcode: ":|::|"},
            {zipcode: "5", barcode: ":|:|:"},
            {zipcode: "6", barcode: ":||::"},
            {zipcode: "7", barcode: "|:::|"},
            {zipcode: "8", barcode: "|::|:"},
            {zipcode: "9", barcode: "|:|::"},
            {zipcode: "0", barcode: "||:::"}
        ];
        let barcodes =  [":::|| ","::|:| ","::||: ",":|::| ",":|:|: ",":||:: ","|:::| ","|::|: ",":|:|: ","|:|:: "];
        expect(num.getBarCodeArr(zipcodeAndCheckDigit,referedLists)).toEqual(barcodes);
    });
});
describe("transformToBarcode",function(){
    it("should return the barcodes",function(){
        let zipcode = "123456789";
        let barcodes = "| :::|| ::|:| ::||: :|::| :|:|: :||:: |:::| |::|: |:|:: :|:|: |";
        expect(num.transformToBarCode(zipcode)).toEqual(barcodes);
    });
    it("should return the barcodes",function(){
        let zipcode = "1234569";
        let barcodes = false;
        expect(num.transformToBarCode(zipcode)).toEqual(barcodes);
    });
});
describe("transformToZipcode",function(){
    it("should return the zipcodes",function(){
        let barcodes = "| :::|| ::|:| ::||: :|::| :|:|: :||:: |:::| |::|: |:|:: :|:|: |";
        let zipcode = "12345-6789";
        expect(num.transformToZipCode(barcodes)).toEqual(zipcode);
    });
    it("should return the zipcodes",function(){
        let barcodes = "| :::|| ::|:| ::||: :|::| :|:|: :||:: |:::| |::|: |:|:: |:::| |";
        let zipcode = undefined;
        expect(num.transformToZipCode(barcodes)).toEqual(zipcode);
    });
});