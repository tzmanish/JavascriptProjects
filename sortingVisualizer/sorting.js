"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
var SortingElement = /** @class */ (function () {
    function SortingElement(elementNumber) {
        this.value = Math.floor(Math.random() * 100) + 1;
        this.element = document.createElement("span");
        this.element.classList.add("sortingElement");
        this.element.id = "element" + elementNumber;
        this.element.style.height = this.value + "%";
    }
    SortingElement.prototype.updateValue = function (newValue) {
        this.value = newValue;
        this.element.style.height = newValue + "%";
    };
    SortingElement.prototype.highlightState = function (state) {
        switch (state) {
            case 1:
                this.element.style.border = "thick solid red";
                break;
            case 2:
                this.element.style.border = "thick solid blue";
                break;
            default:
                this.element.style.border = "none";
        }
    };
    return SortingElement;
}());
var Sorter = /** @class */ (function () {
    function Sorter() {
        this.container = document.getElementById("container");
        this.countInput = document.getElementById("elementCount");
        this.delayAmount = 100;
        this.visualsEnabled = true;
        this.fastForward = false;
        this.elements = [];
        this.container.innerHTML = "";
        this.updateCount(+this.countInput.value);
    }
    Sorter.prototype.updateCount = function (count) {
        console.log(count);
        while (count > this.elements.length) {
            var newElement = new SortingElement(this.elements.length);
            this.elements.push(newElement);
            this.container.appendChild(newElement.element);
        }
        while (count < this.elements.length) {
            var removedElement = this.elements.pop();
            removedElement.element.remove();
        }
    };
    Sorter.prototype.blinkSwap = function (a, b) {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        temp = this.elements[a].value;
                        if (!this.visualsEnabled) return [3 /*break*/, 3];
                        this.elements[a].highlightState(2);
                        this.elements[b].highlightState(2);
                        return [4 /*yield*/, delay(this.delayAmount)];
                    case 1:
                        _a.sent();
                        this.elements[a].highlightState(1);
                        this.elements[b].highlightState(1);
                        this.elements[a].updateValue(this.elements[b].value);
                        this.elements[b].updateValue(temp);
                        return [4 /*yield*/, delay(this.delayAmount / 2)];
                    case 2:
                        _a.sent();
                        this.elements[a].highlightState(0);
                        this.elements[b].highlightState(0);
                        return [3 /*break*/, 4];
                    case 3:
                        this.elements[a].updateValue(this.elements[b].value);
                        this.elements[b].updateValue(temp);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Sorter.prototype.blink = function (a, b) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.visualsEnabled)
                            return [2 /*return*/];
                        this.elements[a].highlightState(1);
                        this.elements[b].highlightState(1);
                        return [4 /*yield*/, delay(this.delayAmount)];
                    case 1:
                        _a.sent();
                        this.elements[a].highlightState(0);
                        this.elements[b].highlightState(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    Sorter.prototype.bubbleSort = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comparisons, swaps, i, j, k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comparisons = 0, swaps = 0;
                        i = this.elements.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i > 0)) return [3 /*break*/, 8];
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < i)) return [3 /*break*/, 7];
                        k = j + 1;
                        comparisons++;
                        if (!(this.elements[j].value > this.elements[k].value)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.blinkSwap(j, k)];
                    case 3:
                        _a.sent();
                        swaps++;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.blink(j, k)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 2];
                    case 7:
                        i--;
                        return [3 /*break*/, 1];
                    case 8:
                        if (this.fastForward) {
                            this.visualsEnabled = true;
                            this.fastForward = false;
                        }
                        return [2 /*return*/, { "comparisons": comparisons, "swaps": swaps }];
                }
            });
        });
    };
    return Sorter;
}());
var sorter = new Sorter();
//# sourceMappingURL=sorting.js.map