/**
 * Created by wangqi on 16-8-1.
 */
'use strict';
function isValidBarCodeFormat(barcodes) {
    return barcodes.startsWith("| ") && barcodes.endsWith(" |");
}
function isValidBarCodeContent(barcodes) {
    let barcodeContent = barcodes.slice(2,barcodes.length-2);
    let barcodeArr = barcodeContent.split("");
    return !barcodeArr.some(function(object){
        return ((object !== ":") && (object !== "|") && (object !== " "));

    })
}
function isValidBarCodeLength(barcodes) {
    let barcodeContent = barcodes.slice(2,barcodes.length-2);
    let barcodeArr = barcodeContent.split(" ");
    return !(barcodeArr.some(function (object) {
        return object.length !== 5;
    }));
}
function isValidBarCode(barcodes) {
    return isValidBarCodeContent(barcodes) && isValidBarCodeFormat(barcodes) && isValidBarCodeLength(barcodes);
}
function getReferenceList() {
    return [
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
}
function getZipCodeArr(barcodes, referedLists) {
    let barcodeString = barcodes.slice(2, barcodes.length - 2);
    let barcodesArr = barcodeString.split(" ");
    return barcodesArr.map(function (object) {
        let item = referedLists.find(function (list) {
            return object === list.barcode;
        });
        return object = item.zipcode;
    });
}
function isValidCheckDigit(zipcodeArr) {
    let sum = zipcodeArr.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
    });
    return sum  % 10 === 0;
}
function formatedZipCode(zipcodeArr, boolean) {
    if (!boolean) {
        return undefined;
    }
    let zipcode = zipcodeArr.slice(0, zipcodeArr.length - 1);
    if (zipcode.length === 5) {
        return zipcode.reduce(function (a, b) {
            return a + b;
        });
    }
    else if (zipcode.length === 9) {
        let zipcodeString = zipcode.reduce(function (a, b) {
            return a + b;
        });
        return zipcodeString.substring(0, 5) + "-" + zipcodeString.substring(5, zipcodeString.length);
    }
}
function transformToZipCode(barcodes) {
    let format = isValidBarCode(barcodes);
    if (!format) {
        return false;
    }
    let referedLists = getReferenceList();
    let zipcodeArr = getZipCodeArr(barcodes, referedLists);
    let boolean = isValidCheckDigit(zipcodeArr);
    return formatedZipCode(zipcodeArr, boolean);
}


function isValidZipCodeLength(zipcode) {
    return zipcode.length === 5 || zipcode.length === 10 || zipcode.length === 9;
}
function isValidZipCodeSymbol(zipcode) {
    let zipcodes = zipcode.split("");
    let arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];
    return !zipcodes.some(function (code) {
        return arr.indexOf(code) === -1;
    });
}
function isValid_Location(zipcode){
    if(zipcode.length === 10){
        return zipcode.substring(5,6) === "-";
    }
    else{
        return true;
    }
}
function isValidZipCode(zipcode) {
    return isValidZipCodeSymbol(zipcode) && isValidZipCodeLength(zipcode);
}
function toTransformStr(zipcode) {
    return zipcode.split("").filter(function (object) {
        return object != "-";
    });
}
function calculateCheckDigit(zipcodeStr) {
    let sum = zipcodeStr.reduce(function (str1, str2) {
        return parseInt(str1) + parseInt(str2);
    });
    let checkcode = (10-(sum % 10))===0 ? "0" : 10-(sum % 10);
    zipcodeStr.push(checkcode.toString());
    return zipcodeStr;
}
function getBarCodeArr(zipcodeAndCheckDigit, referedLists) {
    return zipcodeAndCheckDigit.map(function (object) {
        let barcodeList = referedLists.find(function (list) {
            return list.zipcode === object;
        });
        return object = barcodeList.barcode + " ";
    });
}
function formatedBarCodes(barcodes) {
    let barcodeStr = barcodes.reduce(function (initial, object) {
        return initial + object;
    });
    return "| " + barcodeStr + "|";
}
function transformToBarCode(zipcode) {
    let format = isValidZipCode(zipcode);
    if (!format) {
        return false;
    }
    let zipcodeStr = toTransformStr(zipcode);
    let zipcodeAndCheckDigit = calculateCheckDigit(zipcodeStr);
    let referedLists = getReferenceList();
    let barcodes = getBarCodeArr(zipcodeAndCheckDigit, referedLists);
    return formatedBarCodes(barcodes);
}
module.exports = {
    transformToZipCode: transformToZipCode,
    isValidBarCodeFormat: isValidBarCodeFormat,
    isValidBarCodeContent: isValidBarCodeContent,
    isValidBarCodeLength: isValidBarCodeLength,
    isValidBarCode: isValidBarCode,
    getZipCodeArr: getZipCodeArr,
    isValidCheckDigit: isValidCheckDigit,
    formatedZipCode: formatedZipCode,

    transformToBarCode: transformToBarCode,
    isValidZipCodeLength: isValidZipCodeLength,
    isValid_Location: isValid_Location,
    isValidZipCodeSymbol: isValidZipCodeSymbol,
    isValidZipCode: isValidZipCode,
    toTransformStr: toTransformStr,
    calculateCheckDigit: calculateCheckDigit,
    getBarCodeArr: getBarCodeArr,
    formatedBarCodes: formatedBarCodes
};
