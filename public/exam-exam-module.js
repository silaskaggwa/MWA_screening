(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["exam-exam-module"],{

/***/ "./node_modules/@angular-redux/store/lib/src/components/dev-tools.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/components/dev-tools.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ng_redux_1 = __webpack_require__(/*! ./ng-redux */ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js");
var core_2 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var environment = typeof window !== 'undefined' ? window : {};
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
var DevToolsExtension = /** @class */ (function () {
    /** @hidden */
    function DevToolsExtension(appRef, ngRedux) {
        var _this = this;
        this.appRef = appRef;
        this.ngRedux = ngRedux;
        /**
         * A wrapper for the Chrome Extension Redux DevTools.
         * Makes sure state changes triggered by the extension
         * trigger Angular2's change detector.
         *
         * @argument options: dev tool options; same
         * format as described here:
         * [zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md]
         */
        this.enhancer = function (options) {
            var subscription;
            if (!_this.isEnabled()) {
                return null;
            }
            // Make sure changes from dev tools update angular's view.
            environment.devToolsExtension.listen(function (_a) {
                var type = _a.type;
                if (type === 'START') {
                    subscription = _this.ngRedux.subscribe(function () {
                        if (!core_2.NgZone.isInAngularZone()) {
                            _this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return environment.devToolsExtension(options);
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = function () { return environment && environment.devToolsExtension; };
    }
    DevToolsExtension = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ApplicationRef, ng_redux_1.NgRedux])
    ], DevToolsExtension);
    return DevToolsExtension;
}());
exports.DevToolsExtension = DevToolsExtension;
//# sourceMappingURL=dev-tools.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/components/fractal-reducer-map.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/components/fractal-reducer-map.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var set_in_1 = __webpack_require__(/*! ../utils/set-in */ "./node_modules/@angular-redux/store/lib/src/utils/set-in.js");
var get_in_1 = __webpack_require__(/*! ../utils/get-in */ "./node_modules/@angular-redux/store/lib/src/utils/get-in.js");
var reducerMap = {};
var composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        return reducers.reduce(function (subState, reducer) { return reducer(subState, action); }, state);
    };
};
var ɵ0 = composeReducers;
exports.ɵ0 = ɵ0;
/**
 * @param rootReducer Call this on your root reducer to enable SubStore
 * functionality for pre-configured stores (e.g. using NgRedux.provideStore()).
 * NgRedux.configureStore
 * does it for you under the hood.
 */
function enableFractalReducers(rootReducer) {
    reducerMap = {};
    return composeReducers(rootFractalReducer, rootReducer);
}
exports.enableFractalReducers = enableFractalReducers;
/** @hidden */
function registerFractalReducer(basePath, localReducer) {
    var existingFractalReducer = reducerMap[JSON.stringify(basePath)];
    if (existingFractalReducer && existingFractalReducer !== localReducer) {
        throw new Error("attempt to overwrite fractal reducer for basePath " + basePath);
    }
    reducerMap[JSON.stringify(basePath)] = localReducer;
}
exports.registerFractalReducer = registerFractalReducer;
/** @hidden */
function replaceLocalReducer(basePath, nextLocalReducer) {
    reducerMap[JSON.stringify(basePath)] = nextLocalReducer;
}
exports.replaceLocalReducer = replaceLocalReducer;
function rootFractalReducer(state, action) {
    if (state === void 0) { state = {}; }
    var fractalKey = action['@angular-redux::fractalkey'];
    var fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
    var localReducer = reducerMap[fractalKey || ''];
    return fractalKey && localReducer
        ? set_in_1.setIn(state, fractalPath, localReducer(get_in_1.getIn(state, fractalPath), action))
        : state;
}
//# sourceMappingURL=fractal-reducer-map.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/components/ng-redux.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the public interface of @angular-redux/store. It wraps the global
 * redux store and adds a few other add on methods. It's what you'll inject
 * into your Angular application as a service.
 */
var NgRedux = /** @class */ (function () {
    function NgRedux() {
    }
    /** @hidden, @deprecated */
    NgRedux.instance = undefined;
    return NgRedux;
}());
exports.NgRedux = NgRedux;
//# sourceMappingURL=ng-redux.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/components/root-store.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/components/root-store.js ***!
  \****************************************************************************/
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
var redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var ng_redux_1 = __webpack_require__(/*! ./ng-redux */ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js");
var selectors_1 = __webpack_require__(/*! ./selectors */ "./node_modules/@angular-redux/store/lib/src/components/selectors.js");
var assert_1 = __webpack_require__(/*! ../utils/assert */ "./node_modules/@angular-redux/store/lib/src/utils/assert.js");
var sub_store_1 = __webpack_require__(/*! ./sub-store */ "./node_modules/@angular-redux/store/lib/src/components/sub-store.js");
var fractal_reducer_map_1 = __webpack_require__(/*! ./fractal-reducer-map */ "./node_modules/@angular-redux/store/lib/src/components/fractal-reducer-map.js");
/** @hidden */
var RootStore = /** @class */ (function (_super) {
    __extends(RootStore, _super);
    function RootStore(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this._store = undefined;
        _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
            if (middleware === void 0) { middleware = []; }
            if (enhancers === void 0) { enhancers = []; }
            assert_1.assert(!_this._store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            _this.setStore(redux_1.compose.apply(null, [redux_1.applyMiddleware.apply(void 0, middleware)].concat(enhancers))(redux_1.createStore)(fractal_reducer_map_1.enableFractalReducers(rootReducer), initState));
        };
        _this.provideStore = function (store) {
            assert_1.assert(!_this._store, 'Store already configured!');
            _this.setStore(store);
        };
        _this.getState = function () { return _this._store.getState(); };
        _this.subscribe = function (listener) {
            return _this._store.subscribe(listener);
        };
        _this.replaceReducer = function (nextReducer) {
            _this._store.replaceReducer(nextReducer);
        };
        _this.dispatch = function (action) {
            assert_1.assert(!!_this._store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/@angular-redux/core/blob/master/' +
                'README.md#quick-start');
            if (!core_1.NgZone.isInAngularZone()) {
                return _this.ngZone.run(function () { return _this._store.dispatch(action); });
            }
            else {
                return _this._store.dispatch(action);
            }
        };
        _this.select = function (selector, comparator) {
            return _this._store$.pipe(operators_1.distinctUntilChanged(), operators_1.map(selectors_1.resolveToFunctionSelector(selector)), operators_1.distinctUntilChanged(comparator));
        };
        _this.configureSubStore = function (basePath, localReducer) {
            return new sub_store_1.SubStore(_this, basePath, localReducer);
        };
        _this.storeToObservable = function (store) {
            return new rxjs_1.Observable(function (observer) {
                observer.next(store.getState());
                var unsubscribeFromRedux = store.subscribe(function () {
                    return observer.next(store.getState());
                });
                return function () {
                    unsubscribeFromRedux();
                    observer.complete();
                };
            });
        };
        ng_redux_1.NgRedux.instance = _this;
        _this._store$ = new rxjs_1.BehaviorSubject(undefined).pipe(operators_1.filter(function (n) { return n !== undefined; }), operators_1.switchMap(function (observableStore) { return observableStore; })
        // TODO: fix this? needing to explicitly cast this is wrong
        );
        return _this;
    }
    RootStore.prototype.setStore = function (store) {
        this._store = store;
        var storeServable = this.storeToObservable(store);
        this._store$.next(storeServable);
    };
    return RootStore;
}(ng_redux_1.NgRedux));
exports.RootStore = RootStore;
//# sourceMappingURL=root-store.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/components/selectors.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/components/selectors.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var get_in_1 = __webpack_require__(/*! ../utils/get-in */ "./node_modules/@angular-redux/store/lib/src/utils/get-in.js");
/** @hidden */
exports.sniffSelectorType = function (selector) {
    return !selector
        ? 'nil'
        : Array.isArray(selector)
            ? 'path'
            : 'function' === typeof selector
                ? 'function'
                : 'property';
};
/** @hidden */
exports.resolver = function (selector) { return ({
    property: function (state) {
        return state ? state[selector] : undefined;
    },
    path: function (state) { return get_in_1.getIn(state, selector); },
    function: selector,
    nil: function (state) { return state; },
}); };
/** @hidden */
exports.resolveToFunctionSelector = function (selector) { return exports.resolver(selector)[exports.sniffSelectorType(selector)]; };
//# sourceMappingURL=selectors.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/components/sub-store.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/components/sub-store.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var get_in_1 = __webpack_require__(/*! ../utils/get-in */ "./node_modules/@angular-redux/store/lib/src/utils/get-in.js");
var selectors_1 = __webpack_require__(/*! ./selectors */ "./node_modules/@angular-redux/store/lib/src/components/selectors.js");
var fractal_reducer_map_1 = __webpack_require__(/*! ./fractal-reducer-map */ "./node_modules/@angular-redux/store/lib/src/components/fractal-reducer-map.js");
/** @hidden */
var SubStore = /** @class */ (function () {
    function SubStore(rootStore, basePath, localReducer) {
        var _this = this;
        this.rootStore = rootStore;
        this.basePath = basePath;
        this.dispatch = function (action) {
            return _this.rootStore.dispatch(Object.assign({}, action, {
                '@angular-redux::fractalkey': JSON.stringify(_this.basePath),
            }));
        };
        this.getState = function () { return get_in_1.getIn(_this.rootStore.getState(), _this.basePath); };
        this.configureSubStore = function (basePath, localReducer) {
            return new SubStore(_this.rootStore, _this.basePath.concat(basePath), localReducer);
        };
        this.select = function (selector, comparator) {
            return _this.rootStore
                .select(_this.basePath)
                .pipe(operators_1.map(selectors_1.resolveToFunctionSelector(selector)), operators_1.distinctUntilChanged(comparator));
        };
        this.subscribe = function (listener) {
            var subscription = _this.select().subscribe(listener);
            return function () { return subscription.unsubscribe(); };
        };
        this.replaceReducer = function (nextLocalReducer) {
            return fractal_reducer_map_1.replaceLocalReducer(_this.basePath, nextLocalReducer);
        };
        fractal_reducer_map_1.registerFractalReducer(basePath, localReducer);
    }
    return SubStore;
}());
exports.SubStore = SubStore;
//# sourceMappingURL=sub-store.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/decorators/dispatch.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/decorators/dispatch.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ng_redux_1 = __webpack_require__(/*! ../components/ng-redux */ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/@angular-redux/store/lib/src/decorators/helpers.js");
/**
 * Auto-dispatches the return value of the decorated function.
 *
 * Decorate a function creator method with @dispatch and its return
 * value will automatically be passed to ngRedux.dispatch() for you.
 */
function dispatch() {
    return function decorate(target, key, descriptor) {
        var originalMethod;
        var wrapped = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = originalMethod.apply(this, args);
            if (result !== false) {
                var store = helpers_1.getBaseStore(this) || ng_redux_1.NgRedux.instance;
                if (store) {
                    store.dispatch(result);
                }
            }
            return result;
        };
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        if (descriptor === undefined) {
            var dispatchDescriptor = {
                get: function () { return wrapped; },
                set: function (setMethod) { return (originalMethod = setMethod); },
            };
            Object.defineProperty(target, key, dispatchDescriptor);
            return dispatchDescriptor;
        }
        else {
            originalMethod = descriptor.value;
            descriptor.value = wrapped;
            return descriptor;
        }
    };
}
exports.dispatch = dispatch;
//# sourceMappingURL=dispatch.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/decorators/helpers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/decorators/helpers.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ng_redux_1 = __webpack_require__(/*! ../components/ng-redux */ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/**
 * OPTIONS_KEY: this is per-class (static) and holds the config from the
 * @SubStore decorator.
 */
var OPTIONS_KEY = '@angular-redux::substore::class::options';
/**
 * INSTANCE_SUBSTORE_KEY, INSTANCE_SELECTIONS_KEY: these are per-instance
 * (non-static) and holds references to the substores/selected observables
 * to be used by an instance of a decorated class. I'm not using
 * reflect-metadata here because I want
 *
 * 1. different instances to have different substores in the case where
 * `basePathMethodName` is dynamic.
 * 2. the instance substore to be garbage collected when the instance is no
 * longer reachable.
 * This is therefore an own-property on the actual instance of the decorated
 * class.
 */
var INSTANCE_SUBSTORE_KEY = '@angular-redux::substore::instance::store';
var INSTANCE_SELECTIONS_KEY = '@angular-redux::substore::instance::selections';
/**
 * Used to detect when the base path changes - this allows components to
 * dynamically adjust their selections if necessary.
 */
var INSTANCE_BASE_PATH_KEY = '@angular-redux::substore::instance::basepath';
var getClassOptions = function (decoratedInstance) {
    return decoratedInstance.constructor[OPTIONS_KEY];
};
var ɵ0 = getClassOptions;
exports.ɵ0 = ɵ0;
/** @hidden */
exports.setClassOptions = function (decoratedClassConstructor, options) {
    decoratedClassConstructor[OPTIONS_KEY] = options;
};
// I want the store to be saved on the actual instance so
// 1. different instances can have distinct substores if necessary
// 2. the substore/selections will be marked for garbage collection when the
//    instance is destroyed.
var setInstanceStore = function (decoratedInstance, store) { return (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store); };
var ɵ1 = setInstanceStore;
exports.ɵ1 = ɵ1;
var getInstanceStore = function (decoratedInstance) {
    return decoratedInstance[INSTANCE_SUBSTORE_KEY];
};
var ɵ2 = getInstanceStore;
exports.ɵ2 = ɵ2;
var getInstanceSelectionMap = function (decoratedInstance) {
    var map = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map;
    return map;
};
var ɵ3 = getInstanceSelectionMap;
exports.ɵ3 = ɵ3;
var hasBasePathChanged = function (decoratedInstance, basePath) {
    return decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
};
var ɵ4 = hasBasePathChanged;
exports.ɵ4 = ɵ4;
var setInstanceBasePath = function (decoratedInstance, basePath) {
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
};
var ɵ5 = setInstanceBasePath;
exports.ɵ5 = ɵ5;
var clearInstanceState = function (decoratedInstance) {
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
    decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
};
var ɵ6 = clearInstanceState;
exports.ɵ6 = ɵ6;
/**
 * Gets the store associated with a decorated instance (e.g. a
 * component or service)
 * @hidden
 */
exports.getBaseStore = function (decoratedInstance) {
    // The root store hasn't been set up yet.
    if (!ng_redux_1.NgRedux.instance) {
        return undefined;
    }
    var options = getClassOptions(decoratedInstance);
    // This is not decorated with `@WithSubStore`. Return the root store.
    if (!options) {
        return ng_redux_1.NgRedux.instance;
    }
    // Dynamic base path support:
    var basePath = decoratedInstance[options.basePathMethodName]();
    if (hasBasePathChanged(decoratedInstance, basePath)) {
        clearInstanceState(decoratedInstance);
        setInstanceBasePath(decoratedInstance, basePath);
    }
    if (!basePath) {
        return ng_redux_1.NgRedux.instance;
    }
    var store = getInstanceStore(decoratedInstance);
    if (!store) {
        setInstanceStore(decoratedInstance, ng_redux_1.NgRedux.instance.configureSubStore(basePath, options.localReducer));
    }
    return getInstanceStore(decoratedInstance);
};
/**
 * Creates an Observable from the given selection parameters,
 * rooted at decoratedInstance's store, and caches it on the
 * instance for future use.
 * @hidden
 */
exports.getInstanceSelection = function (decoratedInstance, key, selector, transformer, comparator) {
    var store = exports.getBaseStore(decoratedInstance);
    if (store) {
        var selections = getInstanceSelectionMap(decoratedInstance);
        selections[key] =
            selections[key] ||
                (!transformer
                    ? store.select(selector, comparator)
                    : store
                        .select(selector)
                        .pipe(function (obs$) { return transformer(obs$, decoratedInstance); }, operators_1.distinctUntilChanged(comparator)));
        return selections[key];
    }
    return undefined;
};
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/decorators/select.js":
/*!************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/decorators/select.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/@angular-redux/store/lib/src/decorators/helpers.js");
/**
 * Selects an observable from the store, and attaches it to the decorated
 * property.
 *
 * ```ts
 *  import { select } from '@angular-redux/store';
 *
 *  class SomeClass {
 *    @select(['foo','bar']) foo$: Observable<string>
 * }
 * ```
 *
 * @param selector
 * A selector function, property name string, or property name path
 * (array of strings/array indices) that locates the store data to be
 * selected
 *
 * @param comparator Function used to determine if this selector has changed.
 */
function select(selector, comparator) {
    return function (target, key) {
        var adjustedSelector = selector
            ? selector
            : String(key).lastIndexOf('$') === String(key).length - 1
                ? String(key).substring(0, String(key).length - 1)
                : key;
        decorate(adjustedSelector, undefined, comparator)(target, key);
    };
}
exports.select = select;
/**
 * Selects an observable using the given path selector, and runs it through the
 * given transformer function. A transformer function takes the store
 * observable as an input and returns a derived observable from it. That derived
 *  observable is run through distinctUntilChanges with the given optional
 * comparator and attached to the store property.
 *
 * Think of a Transformer as a FunctionSelector that operates on observables
 * instead of values.
 *
 * ```ts
 * import { select$ } from 'angular-redux/store';
 *
 * export const debounceAndTriple = obs$ => obs$
 *  .debounce(300)
 *  .map(x => 3 * x);
 *
 * class Foo {
 *  @select$(['foo', 'bar'], debounceAndTriple)
 *  readonly debouncedFooBar$: Observable<number>;
 * }
 * ```
 */
function select$(selector, transformer, comparator) {
    return decorate(selector, transformer, comparator);
}
exports.select$ = select$;
function decorate(selector, transformer, comparator) {
    return function decorator(target, key) {
        function getter() {
            return helpers_1.getInstanceSelection(this, key, selector, transformer, comparator);
        }
        // Replace decorated property with a getter that returns the observable.
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                enumerable: true,
                configurable: true,
            });
        }
    };
}
//# sourceMappingURL=select.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/decorators/with-sub-store.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/decorators/with-sub-store.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ./helpers */ "./node_modules/@angular-redux/store/lib/src/decorators/helpers.js");
/**
 * Modifies the behaviour of any `@select`, `@select$`, or `@dispatch`
 * decorators to operate on a substore defined by the IFractalStoreOptions.
 *
 * See:
 * https://github.com/angular-redux/store/blob/master/articles/fractal-store.md
 * for more information about SubStores.
 */
function WithSubStore(_a) {
    var basePathMethodName = _a.basePathMethodName, localReducer = _a.localReducer;
    return function decorate(constructor) {
        helpers_1.setClassOptions(constructor, {
            basePathMethodName: basePathMethodName,
            localReducer: localReducer,
        });
    };
}
exports.WithSubStore = WithSubStore;
//# sourceMappingURL=with-sub-store.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ng_redux_1 = __webpack_require__(/*! ./components/ng-redux */ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js");
exports.NgRedux = ng_redux_1.NgRedux;
var dev_tools_1 = __webpack_require__(/*! ./components/dev-tools */ "./node_modules/@angular-redux/store/lib/src/components/dev-tools.js");
exports.DevToolsExtension = dev_tools_1.DevToolsExtension;
var fractal_reducer_map_1 = __webpack_require__(/*! ./components/fractal-reducer-map */ "./node_modules/@angular-redux/store/lib/src/components/fractal-reducer-map.js");
exports.enableFractalReducers = fractal_reducer_map_1.enableFractalReducers;
var select_1 = __webpack_require__(/*! ./decorators/select */ "./node_modules/@angular-redux/store/lib/src/decorators/select.js");
exports.select = select_1.select;
exports.select$ = select_1.select$;
var dispatch_1 = __webpack_require__(/*! ./decorators/dispatch */ "./node_modules/@angular-redux/store/lib/src/decorators/dispatch.js");
exports.dispatch = dispatch_1.dispatch;
var with_sub_store_1 = __webpack_require__(/*! ./decorators/with-sub-store */ "./node_modules/@angular-redux/store/lib/src/decorators/with-sub-store.js");
exports.WithSubStore = with_sub_store_1.WithSubStore;
var ng_redux_module_1 = __webpack_require__(/*! ./ng-redux.module */ "./node_modules/@angular-redux/store/lib/src/ng-redux.module.js");
exports.NgReduxModule = ng_redux_module_1.NgReduxModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/ng-redux.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/ng-redux.module.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var ng_redux_1 = __webpack_require__(/*! ./components/ng-redux */ "./node_modules/@angular-redux/store/lib/src/components/ng-redux.js");
var root_store_1 = __webpack_require__(/*! ./components/root-store */ "./node_modules/@angular-redux/store/lib/src/components/root-store.js");
var dev_tools_1 = __webpack_require__(/*! ./components/dev-tools */ "./node_modules/@angular-redux/store/lib/src/components/dev-tools.js");
/** @hidden */
function _ngReduxFactory(ngZone) {
    return new root_store_1.RootStore(ngZone);
}
exports._ngReduxFactory = _ngReduxFactory;
var NgReduxModule = /** @class */ (function () {
    function NgReduxModule() {
    }
    NgReduxModule = __decorate([
        core_1.NgModule({
            providers: [
                dev_tools_1.DevToolsExtension,
                { provide: ng_redux_1.NgRedux, useFactory: _ngReduxFactory, deps: [core_1.NgZone] },
            ],
        })
    ], NgReduxModule);
    return NgReduxModule;
}());
exports.NgReduxModule = NgReduxModule;
//# sourceMappingURL=ng-redux.module.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/utils/assert.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/utils/assert.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @hidden */
exports.assert = function (condition, message) {
    if (!condition) {
        throw new Error(message);
    }
};
//# sourceMappingURL=assert.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/utils/get-in.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/utils/get-in.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices.
 *
 * @hidden
 */
function getIn(v, pathElems) {
    if (!v) {
        return v;
    }
    // If this is an ImmutableJS structure, use existing getIn function
    if ('function' === typeof v.getIn) {
        return v.getIn(pathElems);
    }
    var firstElem = pathElems[0], restElems = pathElems.slice(1);
    if (undefined === v[firstElem]) {
        return undefined;
    }
    if (restElems.length === 0) {
        return v[firstElem];
    }
    return getIn(v[firstElem], restElems);
}
exports.getIn = getIn;
//# sourceMappingURL=get-in.js.map

/***/ }),

/***/ "./node_modules/@angular-redux/store/lib/src/utils/set-in.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@angular-redux/store/lib/src/utils/set-in.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices. Path elements are created if
 * not there already. Does not mutate the given object.
 *
 * @hidden
 */
exports.setIn = function (obj, _a, value) {
    var firstElem = _a[0], restElems = _a.slice(1);
    return 'function' === typeof (obj[firstElem] || {}).setIn
        ? __assign({}, obj, (_b = {}, _b[firstElem] = obj[firstElem].setIn(restElems, value), _b)) : __assign({}, obj, (_c = {}, _c[firstElem] = restElems.length === 0
        ? value
        : exports.setIn(obj[firstElem] || {}, restElems, value), _c));
    var _b, _c;
};
//# sourceMappingURL=set-in.js.map

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/app/exam/ended.component.ts":
/*!*****************************************!*\
  !*** ./src/app/exam/ended.component.ts ***!
  \*****************************************/
/*! exports provided: EndedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndedComponent", function() { return EndedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EndedComponent = /** @class */ (function () {
    function EndedComponent() {
    }
    EndedComponent.prototype.ngOnInit = function () {
    };
    EndedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ended',
            template: "\n    <div>\n      <h1>\n        Exam Ended !\n      </h1>\n    </div>\n  ",
            styles: ['div {position: relative; padding: 20%;} h1 {text-align: center;}']
        }),
        __metadata("design:paramtypes", [])
    ], EndedComponent);
    return EndedComponent;
}());



/***/ }),

/***/ "./src/app/exam/exam.component.css":
/*!*****************************************!*\
  !*** ./src/app/exam/exam.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container{\n    margin-top: 20px;\n    margin-bottom: 20px;\n}\n.exam-form {\n    width: 100%;\n}\n.exam-input {\n    width: 100%;\n    box-sizing: border-box;\n}\n.exam-card {\n    overflow: auto;\n    box-sizing: border-box\n}"

/***/ }),

/***/ "./src/app/exam/exam.component.html":
/*!******************************************!*\
  !*** ./src/app/exam/exam.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n        <h2>TAS Screening</h2>\n        <span class=\"spacer\"></span><span class=\"spacer\"></span>\n    </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"container\" fxLayout=\"row\" fxLayoutGap=\"20px\" fxLayoutAlign=\"center\">\n    <div fxFlex=70% class=\"exam-card\">\n        <div fxLayout=\"row\">\n                <mat-chip-list>\n                    <mat-chip color=\"primary\" selected>\n                        <mat-icon>person</mat-icon>\n                        {{student_name}}\n                    </mat-chip>\n                    <mat-chip color=\"accent\" selected>\n                        <mat-icon>email</mat-icon>\n                        {{student_email}}\n                    </mat-chip>\n                    <mat-chip color=\"warn\" selected>\n                        <mat-icon>timer</mat-icon>\n                        {{time_remaining}}\n                    </mat-chip>\n                </mat-chip-list>\n        </div>\n        <mat-progress-bar mode=\"indeterminate\" *ngIf=\"show_loader\"></mat-progress-bar>\n\n        <app-question class=\"exam-form\" *ngFor=\"let qn of questions\" [question]=\"qn\" ></app-question>\n        \n        <div fxLayout=\"row\" class=\"exam-footer\" *ngIf=\"!show_loader\">\n            <button mat-raised-button (click)=\"submitAnswer()\">Submit</button>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/exam/exam.component.ts":
/*!****************************************!*\
  !*** ./src/app/exam/exam.component.ts ***!
  \****************************************/
/*! exports provided: ExamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamComponent", function() { return ExamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _exam_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exam.service */ "./src/app/exam/exam.service.ts");
/* harmony import */ var _redux_exam_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redux/exam.actions */ "./src/app/exam/redux/exam.actions.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ExamComponent = /** @class */ (function () {
    function ExamComponent(examService, ngRedux, router) {
        this.examService = examService;
        this.ngRedux = ngRedux;
        this.router = router;
        this.questions = [];
        this.show_loader = false;
        this.student_name = '';
        this.student_email = '';
        this.time_used = 0;
        this.time_away = 0;
        this.time_remaining = 0;
        this.duration = 0;
        this.exam_ended = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    ExamComponent.prototype.startTimer = function () {
        var _this = this;
        setInterval(function () {
            var timeRemaining = _this.duration - _this.time_used;
            if (timeRemaining <= 0) {
                _this.exam_ended.next(true);
                _this.time_remaining = 0;
            }
            else {
                _this.time_used++;
                _this.ngRedux.dispatch({ type: _redux_exam_actions__WEBPACK_IMPORTED_MODULE_2__["INCREMENT_TIME_USED"], increment: 1 });
                _this.time_remaining = timeRemaining;
            }
        }, 60000);
    };
    ExamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.show_loader = true;
        this.examEndedSubscription = this.exam_ended.subscribe(function (ended) {
            if (ended) {
                console.log(">> Exam should end!!!");
                _this.killTimer();
                _this.lockExam();
            }
        });
        this.retrieveExamSubscription = this.examService.retrieveExam()
            .subscribe(function (data) {
            if (data.status == 'ended') {
                _this.router.navigate(['/exam/ended']);
            }
            else if (data.status == 'unauthorized') {
                _this.router.navigate(['/unauthorized']);
            }
            else {
                _this.student_name = data.name;
                _this.student_email = data.email;
                _this.questions = data.questions;
                _this.time_used = data.time_used;
                _this.time_away = data.time_away;
                _this.duration = data.duration;
                _this.time_remaining = data.duration - data.time_used;
                _this.ngRedux.dispatch({ type: _redux_exam_actions__WEBPACK_IMPORTED_MODULE_2__["SET_INVITATION_ID"], invitation_id: data.id });
                _this.show_loader = false;
                _this.theTimer = _this.startTimer();
                if (_this.time_remaining > 0) {
                    _this.exam_ended.next(false);
                }
                else {
                    _this.exam_ended.next(true);
                }
            }
        }, function (err) {
            _this.router.navigate(['/unauthorized']);
        });
    };
    ExamComponent.prototype.submitAnswer = function () {
        this.lockExam();
    };
    ExamComponent.prototype.killTimer = function () {
        clearInterval(this.theTimer);
    };
    ExamComponent.prototype.ngOnDestroy = function () {
        this.retrieveExamSubscription.unsubscribe();
        this.examEndedSubscription.unsubscribe();
    };
    ExamComponent.prototype.lockExam = function () {
        var _this = this;
        this.show_loader = true;
        setTimeout(function () {
            //this.router.navigate(['/exam/ended']);
            _this.examService.endExam()
                .subscribe(function (data) {
                if (data.status == 'ended') {
                    _this.show_loader = false;
                    _this.router.navigate(['/exam/ended']);
                }
            });
        }, 500);
    };
    ExamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-exam',
            template: __webpack_require__(/*! ./exam.component.html */ "./src/app/exam/exam.component.html"),
            styles: [__webpack_require__(/*! ./exam.component.css */ "./src/app/exam/exam.component.css")]
        }),
        __metadata("design:paramtypes", [_exam_service__WEBPACK_IMPORTED_MODULE_1__["ExamService"], _angular_redux_store__WEBPACK_IMPORTED_MODULE_4__["NgRedux"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ExamComponent);
    return ExamComponent;
}());



/***/ }),

/***/ "./src/app/exam/exam.guard.ts":
/*!************************************!*\
  !*** ./src/app/exam/exam.guard.ts ***!
  \************************************/
/*! exports provided: ExamGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamGuard", function() { return ExamGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ExamGuard = /** @class */ (function () {
    function ExamGuard() {
    }
    ExamGuard.prototype.canActivate = function (next, state) {
        return true;
    };
    ExamGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], ExamGuard);
    return ExamGuard;
}());



/***/ }),

/***/ "./src/app/exam/exam.module.ts":
/*!*************************************!*\
  !*** ./src/app/exam/exam.module.ts ***!
  \*************************************/
/*! exports provided: EXAM_ROUTES, ExamModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXAM_ROUTES", function() { return EXAM_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamModule", function() { return ExamModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _exam_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exam.component */ "./src/app/exam/exam.component.ts");
/* harmony import */ var _exam_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exam.guard */ "./src/app/exam/exam.guard.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _question_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./question.component */ "./src/app/exam/question.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _redux_exam_store__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./redux/exam.store */ "./src/app/exam/redux/exam.store.ts");
/* harmony import */ var _exam_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./exam.service */ "./src/app/exam/exam.service.ts");
/* harmony import */ var _ended_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ended.component */ "./src/app/exam/ended.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var EXAM_ROUTES = [
    { path: '', component: _exam_component__WEBPACK_IMPORTED_MODULE_2__["ExamComponent"], canActivate: [_exam_guard__WEBPACK_IMPORTED_MODULE_3__["ExamGuard"]] },
    { path: 'ended', component: _ended_component__WEBPACK_IMPORTED_MODULE_18__["EndedComponent"], canActivate: [_exam_guard__WEBPACK_IMPORTED_MODULE_3__["ExamGuard"]] }
];
var ExamModule = /** @class */ (function () {
    function ExamModule(ngRedux) {
        ngRedux.configureStore(_redux_exam_store__WEBPACK_IMPORTED_MODULE_16__["rootReducer"], _redux_exam_store__WEBPACK_IMPORTED_MODULE_16__["INITIAL_STATE"]);
    }
    ExamModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(EXAM_ROUTES),
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_19__["MatToolbarModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__["MatProgressBarModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_11__["MatChipsModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
                _angular_redux_store__WEBPACK_IMPORTED_MODULE_15__["NgReduxModule"]
            ],
            declarations: [
                _exam_component__WEBPACK_IMPORTED_MODULE_2__["ExamComponent"],
                _question_component__WEBPACK_IMPORTED_MODULE_13__["QuestionComponent"],
                _ended_component__WEBPACK_IMPORTED_MODULE_18__["EndedComponent"]
            ],
            providers: [_exam_service__WEBPACK_IMPORTED_MODULE_17__["ExamService"]],
            bootstrap: [_exam_component__WEBPACK_IMPORTED_MODULE_2__["ExamComponent"]]
        }),
        __metadata("design:paramtypes", [_angular_redux_store__WEBPACK_IMPORTED_MODULE_15__["NgRedux"]])
    ], ExamModule);
    return ExamModule;
}());



/***/ }),

/***/ "./src/app/exam/exam.service.ts":
/*!**************************************!*\
  !*** ./src/app/exam/exam.service.ts ***!
  \**************************************/
/*! exports provided: ExamService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamService", function() { return ExamService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular-redux/store */ "./node_modules/@angular-redux/store/lib/src/index.js");
/* harmony import */ var _angular_redux_store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_redux_store__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ExamService = /** @class */ (function () {
    function ExamService(http, ngRedux) {
        this.http = http;
        this.ngRedux = ngRedux;
        this.domain = 'http://localhost:3000';
    }
    ExamService.prototype.retrieveExam = function () {
        return this.http.get(this.domain + '/progress/questions', { withCredentials: true });
    };
    ExamService.prototype.postSnapshot = function (qn_id, snapshot, qn_duration) {
        var time_away = this.ngRedux.getState().time_away;
        var time_used = this.ngRedux.getState().time_used;
        return this.http.patch(this.domain + '/progress', { qn_id: qn_id, snapshot: snapshot, qn_duration: qn_duration, time_used: time_used, time_away: time_away }, { withCredentials: true });
    };
    ExamService.prototype.endExam = function () {
        var time_away = this.ngRedux.getState().time_away;
        var time_used = this.ngRedux.getState().time_used;
        var submit = true;
        return this.http.patch(this.domain + '/progress/end', { submit: submit, time_used: time_used, time_away: time_away }, { withCredentials: true });
    };
    ExamService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_redux_store__WEBPACK_IMPORTED_MODULE_2__["NgRedux"]])
    ], ExamService);
    return ExamService;
}());



/***/ }),

/***/ "./src/app/exam/question.component.css":
/*!*********************************************!*\
  !*** ./src/app/exam/question.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".code-input{\n    width: 100%;\n    background: url(http://i.imgur.com/2cOaJ.png);\n    background-attachment: local;\n    background-repeat: no-repeat;\n    padding-left: 35px;\n    padding-top: 10px;\n    font-family: monospace;\n    box-sizing: border-box;\n}"

/***/ }),

/***/ "./src/app/exam/question.component.ts":
/*!********************************************!*\
  !*** ./src/app/exam/question.component.ts ***!
  \********************************************/
/*! exports provided: QuestionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionComponent", function() { return QuestionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _exam_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exam.service */ "./src/app/exam/exam.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QuestionComponent = /** @class */ (function () {
    function QuestionComponent(examService) {
        this.examService = examService;
        this.answer = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
    }
    QuestionComponent.prototype.startTimer = function () {
        var _this = this;
        this.theTimer = setInterval(function () {
            _this.duration++;
        }, 1000);
    };
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.duration = this.question.duration;
        this.answer.setValue(this.question.last_answer);
        this.answer.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(500))
            .subscribe(function (snapshot) {
            _this.sendProgressToServer(snapshot);
        });
    };
    QuestionComponent.prototype.sendProgressToServer = function (snapshot) {
        this.examService.postSnapshot(this.question._id, snapshot, this.duration)
            .subscribe(function (response) { console.log(response); }, function (error) { return console.log(error); });
    };
    QuestionComponent.prototype.onFocus = function () {
        this.startTimer();
    };
    QuestionComponent.prototype.onBlur = function () {
        console.log("timer destroyed");
        clearInterval(this.theTimer);
        this.sendProgressToServer(this.answer);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], QuestionComponent.prototype, "question", void 0);
    QuestionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-question',
            template: "\n    <div class=\"exam-input\">\n      <p>{{question.question}}</p>\n      <textarea matInput class=\"code-input\" rows=\"10\" (blur)=\"onBlur()\" (focus)=\"onFocus()\" [formControl]=\"answer\"></textarea>\n    </div>\n  ",
            styles: [__webpack_require__(/*! ./question.component.css */ "./src/app/exam/question.component.css")]
        }),
        __metadata("design:paramtypes", [_exam_service__WEBPACK_IMPORTED_MODULE_3__["ExamService"]])
    ], QuestionComponent);
    return QuestionComponent;
}());



/***/ }),

/***/ "./src/app/exam/redux/exam.actions.ts":
/*!********************************************!*\
  !*** ./src/app/exam/redux/exam.actions.ts ***!
  \********************************************/
/*! exports provided: SET_INVITATION_ID, INCREMENT_TIME_AWAY, INCREMENT_TIME_USED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_INVITATION_ID", function() { return SET_INVITATION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCREMENT_TIME_AWAY", function() { return INCREMENT_TIME_AWAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCREMENT_TIME_USED", function() { return INCREMENT_TIME_USED; });
var SET_INVITATION_ID = 'SET_INVITATION_ID';
var INCREMENT_TIME_AWAY = 'INCREMENT_TIME_AWAY';
var INCREMENT_TIME_USED = 'INCREMENT_TIME_USED';


/***/ }),

/***/ "./src/app/exam/redux/exam.store.ts":
/*!******************************************!*\
  !*** ./src/app/exam/redux/exam.store.ts ***!
  \******************************************/
/*! exports provided: INITIAL_STATE, rootReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_STATE", function() { return INITIAL_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootReducer", function() { return rootReducer; });
/* harmony import */ var _exam_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exam.actions */ "./src/app/exam/redux/exam.actions.ts");

var INITIAL_STATE = {
    invitation_id: null,
    time_used: 0,
    time_away: 0,
};
function rootReducer(lastState, action) {
    switch (action.type) {
        case _exam_actions__WEBPACK_IMPORTED_MODULE_0__["SET_INVITATION_ID"]:
            return Object.assign({}, lastState, {
                invitation_id: action.invitation_id,
                time_used: lastState.time_used,
                time_away: lastState.time_away
            });
        case _exam_actions__WEBPACK_IMPORTED_MODULE_0__["INCREMENT_TIME_USED"]:
            return Object.assign({}, lastState, {
                invitation_id: lastState.invitation_id,
                time_used: lastState.time_used + action.increment,
                time_away: lastState.time_away
            });
        case _exam_actions__WEBPACK_IMPORTED_MODULE_0__["INCREMENT_TIME_AWAY"]:
            return Object.assign({}, lastState, {
                invitation_id: lastState.invitation_id,
                time_used: lastState.time_used,
                time_away: lastState.time_away + action.increment
            });
    }
    return lastState;
}


/***/ })

}]);
//# sourceMappingURL=exam-exam-module.js.map