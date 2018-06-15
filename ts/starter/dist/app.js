/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/ext-flight-manager.ts":
/*!***********************************!*\
  !*** ./app/ext-flight-manager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var flight_manager_1 = __webpack_require__(/*! ./flight-manager */ "./app/flight-manager.ts");
var ExtFlightManager = /** @class */ (function (_super) {
    __extends(ExtFlightManager, _super);
    function ExtFlightManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ExtFlightManager.prototype, "count", {
        // constructor(cache: Array<Flight>, sth: string) {
        //     super(cache);
        // }
        get: function () {
            return this.cache.length;
        },
        enumerable: true,
        configurable: true
    });
    return ExtFlightManager;
}(flight_manager_1.FlightManager));
exports.ExtFlightManager = ExtFlightManager;


/***/ }),

/***/ "./app/flight-manager.ts":
/*!*******************************!*\
  !*** ./app/flight-manager.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FlightManager = /** @class */ (function () {
    function FlightManager(cache) {
        if (cache === void 0) { cache = []; }
        this.cache = cache;
    }
    FlightManager.prototype.search = function (from, to) {
        var result = new Array();
        for (var _i = 0, _a = this.cache; _i < _a.length; _i++) {
            var flight = _a[_i];
            if (flight.from == from && flight.to == to) {
                result.push(flight);
            }
        }
        return result;
    };
    return FlightManager;
}());
exports.FlightManager = FlightManager;


/***/ }),

/***/ "./app/flights.ts":
/*!************************!*\
  !*** ./app/flights.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Flight = /** @class */ (function () {
    function Flight(id) {
        this.id = id;
        // this.id = id
    }
    return Flight;
}());
exports.Flight = Flight;


/***/ }),

/***/ "./app/main.ts":
/*!*********************!*\
  !*** ./app/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var flights_1 = __webpack_require__(/*! ./flights */ "./app/flights.ts");
var ext_flight_manager_1 = __webpack_require__(/*! ./ext-flight-manager */ "./app/ext-flight-manager.ts");
var f1 = new flights_1.Flight(1);
f1.from = 'Graz';
f1.to = 'Mallorca';
f1.date = 'now';
var f2 = new flights_1.Flight(2);
f2.from = 'Mallorca';
f2.to = 'Graz';
f2.date = 'now';
var cache = [f1, f2];
var fm = new ext_flight_manager_1.ExtFlightManager(cache);
var result = fm.search('Graz', 'Mallorca');
console.debug('result', result);
console.debug('count of flights', fm.count);


/***/ })

/******/ });
//# sourceMappingURL=app.js.map