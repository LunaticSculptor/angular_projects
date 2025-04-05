"use strict";
// function Logger(target: Function) {
//     console.log('Logging');
//     console.log(target);
// }
// @Logger
// class User{
//     name = 'John';
//     age = 28;
//     constructor(){
//         console.log('User class constructor called...')
//     }
// }
// const u = new User();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
function helperDec(target, key, descriptor) {
    console.log("target---->>>", target);
    console.log("key--->>", key);
    console.log("descriptor---->>>>", descriptor);
    const prev = descriptor.value;
    const newMethod = {
        configurable: true,
        enumerable: false,
        get() {
            return prev.bind(this);
        },
    };
    return newMethod;
}
class MyClass {
    constructor(msg) {
        this.msg = msg;
    }
    printMsg() {
        console.log(this.msg);
    }
    setMsg(newMsg) {
        this.msg = newMsg;
    }
}
__decorate([
    helperDec
], MyClass.prototype, "printMsg", null);
const obj = new MyClass("Helllo world!");
(_a = document.getElementById("btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", obj.printMsg);
