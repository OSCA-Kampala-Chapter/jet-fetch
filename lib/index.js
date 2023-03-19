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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jet = void 0;
class Jet {
    constructor(options) {
        // let configOptions = ÷{...configuration, ...options} // merge what the user sent with what we have, override defaults
        this.baseUrl = options.baseUrl;
        this.token = (options === null || options === void 0 ? void 0 : options.token) || null;
        this.tokenBearerKey = (options === null || options === void 0 ? void 0 : options.tokenBearerKey) || 'SecretKey';
        this.sendTokenAs = (options === null || options === void 0 ? void 0 : options.sendTokenAs) || 'Bearer';
        this.interceptWithJWTAuth = (options === null || options === void 0 ? void 0 : options.interceptWithJWTAuth) || false;
        this.headers = (options === null || options === void 0 ? void 0 : options.defaultHeaders) || {};
        this.cachable = (options === null || options === void 0 ? void 0 : options.cachable) || true;
    }
    attachAuthorisation() {
        // if the dev provided the token, use that, otherwise, attempt to get it from the localstorage
        const token = this.token || localStorage.getItem(this.tokenBearerKey);
        if (token) {
            return this.generateAuthHeader(this.token);
        }
        return null;
    }
    generateAuthHeader(token) {
        if (token) {
            const headerString = {
                Authorization: '',
            };
            headerString.Authorization = this.sendTokenAs + ' ' + token;
            return headerString;
        }
        return null;
    }
    flyer(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (url) {
                    const response = yield fetch(url, data);
                    const resData = yield response.json();
                    const res = {
                        response,
                        data: resData,
                    };
                    return Promise.resolve(res);
                }
                return Promise.reject('Request url undefined, are you sure you defined your baseUrl');
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * Checks if an object is empty
     * @param {object} obj The object to check
     * @returns bool
     */
    isEmpty(obj) {
        if (!obj) {
            return true;
        }
        else if (Object.keys(obj).length === 0) {
            return true;
        }
        return false;
    }
    /**
     * Sets the body part of the request
     * @param {object} body-> Request body
     * @param {object} config-> Request configurations
     * @returns Object -> Configuration with body combined
     */
    _setBody(body, config) {
        if (body && config) {
            config.body = JSON.stringify(body);
        }
        return config;
    }
    _setType(config, type) {
        // set the request method
        if (config && !('type' in config)) {
            config.method = type === null || type === void 0 ? void 0 : type.toUpperCase();
        }
        return config;
    }
    _getHeaders() {
        const obj = {
            cache: 'default',
        };
        if (!this.cachable) {
            obj.cache = 'no-cache';
        }
        return Object.assign(Object.assign({}, this.headers), obj);
    }
    _setHeaders(headers) {
        return Object.assign(Object.assign({}, this._getHeaders()), headers);
    }
    _setUrl(url) {
        if (this.baseUrl) {
            let newBase = this.baseUrl;
            let newLink = url;
            if (newBase.charAt(newBase.length - 1) !== '/') {
                newBase = newBase + '/';
            }
            if ((newLink === null || newLink === void 0 ? void 0 : newLink.charAt(0)) === '/') {
                newLink = newLink.substring(1, newLink.length - 1);
            }
            return `${newBase}${newLink}`;
        }
        return url;
    }
    _extractHeadersFromConfigs(config) {
        const configKeys = config ? Object.keys(config) : [];
        if (configKeys.length > 0 && config.headers) {
            this._setHeaders(config.headers);
        }
        // set allowed origins, otherwise will default to all
        if (!('Access-Control-Allow-Origin' in this.headers) || 'cors' in config) {
            this._setHeaders({ 'Access-Control-Allow-Origin': '*' });
        }
        // set the default content-type to application/json if non was provided
        if (!('Content-Type' in this.headers)) {
            this._setHeaders({ 'Content-Type': 'application/json' });
        }
        return this.headers;
    }
    __attach_auth() {
        if (this.interceptWithJWTAuth) {
            const auth = this.attachAuthorisation();
            // if it has something from auth, lets use it
            if (auth && !('Authorization' in this.headers)) {
                this._setHeaders({ Authorization: auth === null || auth === void 0 ? void 0 : auth.Authorization });
            }
        }
        return this.headers;
    }
    /**
     * Populates the body and configurations of the request, should not be called directly from the instannce
     * @protected
     * @param {object} body Request body/data
     * @author jet2018
     * @param {object} configs Request configurations such as headers and any other settings
     * @see [customising fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_your_own_request_object)
     * @param headers Request headers
     * @param {string} type Request type, that is, post, get, put ...
     * @returns Object
     */
    _populateData(type = 'GET', body, headers, configs, secure = false) {
        // set the body if the request is not get
        let newConfigs = {};
        if (body && type !== 'GET') {
            newConfigs = Object.assign(Object.assign({}, configs), this._setBody(body, configs));
        }
        // attach the headers
        if (headers != null && configs) {
            configs.headers = this._setHeaders(headers);
        }
        newConfigs = Object.assign(Object.assign({}, configs), this._setType(configs, type));
        this._extractHeadersFromConfigs(newConfigs);
        if (secure) {
            // if it a secure request, attach the token
            this.__attach_auth();
        }
        newConfigs.headers = this.headers;
        return configs;
    }
    _requestDefinition(url, type, body, headers, config, secure = false) {
        const newUrl = this._setUrl(url);
        const data = this._populateData(type, body, headers, config, secure);
        return { newUrl, data };
    }
    /**
     * Makes a GET request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} headers Request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    get(url, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'GET', null, headers, config);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a secure GET request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} headers Request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    gets(url, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'GET', null, headers, config, true);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a POST request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    post(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'POST', body, headers, config);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a secure POST request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    posts(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'POST', body, headers, config, true);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a PATCH request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    patch(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'PATCH', body, headers, config);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a secure PATCH request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    patchs(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'PATCH', body, headers, config, true);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a PUT request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    put(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'PUT', body, headers, config);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a secure PUT request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    puts(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'PUT', body, headers, config, true);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a DELETE request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    delete(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'DELETE', body, headers, config);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * Makes a DELETE request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    deletes(url, body, headers, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, 'DELETE', body, headers, config, true);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    /**
     * If the pre-configured request types are not working for you, using this endpoint enables you to configure your own ground up.
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {string} type Request type, can be GET, PUT, PATCH, DELETE etc
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @param {boolean} secure Whether the token should be attached or not
     * @returns Promise
     */
    custom(url, type, body, headers, config, secure = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUrl, data } = this._requestDefinition(url, type, body, headers, config, secure);
            try {
                return this.flyer(newUrl, data);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.Jet = Jet;
