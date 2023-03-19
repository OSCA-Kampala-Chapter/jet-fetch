/**
 * The Jet Class configurations
 * @param baseUrl string, the request base url and it is reqiured
 * @param interceptWithJWTAuth boolean, defaults to false, if true, the package will attempt attaching the jwt token as explained in the docs
 * @param token any, This can be any source of token like a function to execute to obtain, a token itself, once provided, the
 * package won't be checking localstorage for any token, but will always refer to it for the token
 * @param tokenBearerKey string, optional - defines how the token is stored in your localstorage, this will be the key to check for in the localstorage and defaults to 'SecretKey'
 * @param sendTokenAs string, optional - this is how the token will be sent to the backend, in short, this is how your backend expects your token and it defaults to 'Bearer' and by convention, can be one of of Bearer, Jwt, Token, by you can pass it as anything you want or empty "" to send nothing on its position
 * @param defaultHeaders HeadersInit, these are headers you want to be common to all requests, you can override these by re-defining the ssame in the subsequent request, those will overrride what you had declared on initialisation. Defaults to an empty object
 * @since 19th/03/23 @param cachable boolean, defaults to true, this makes requests cached thus improving the perfomance of the request. Once its on, it add the {'cache': 'default'} to the headers, and once turned off, it turns the same to 'no-cache'. Still this can be overriden by passing the cache header on your subsequent request headers. To globally disable caching, turn this off.
 */
interface Configuration {
  baseUrl: string;
  interceptWithJWTAuth?: boolean;
  token?: any;
  tokenBearerKey?: string;
  sendTokenAs?: string;
  defaultHeaders?: HeadersInit;
  cachable?: boolean;
}

export class Jet {
  baseUrl: string;
  token: any;
  tokenBearerKey: string;
  sendTokenAs: string;
  interceptWithJWTAuth: boolean;
  headers: HeadersInit;
  cachable: boolean | undefined;

  constructor(options: Configuration) {
    // let configOptions = ÷{...configuration, ...options} // merge what the user sent with what we have, override defaults
    this.baseUrl = options.baseUrl;
    this.token = options?.token || null;
    this.tokenBearerKey = options?.tokenBearerKey || 'SecretKey';
    this.sendTokenAs = options?.sendTokenAs || 'Bearer';
    this.interceptWithJWTAuth = options?.interceptWithJWTAuth || false;
    this.headers = options?.defaultHeaders || {};
    this.cachable = options?.cachable || true;
  }

  attachAuthorisation() {
    // if the dev provided the token, use that, otherwise, attempt to get it from the localstorage
    const token = this.token || localStorage.getItem(this.tokenBearerKey);
    if (token) {
      return this.generateAuthHeader(this.token);
    }

    return null;
  }

  generateAuthHeader(token: any) {
    if (token) {
      const headerString = {
        Authorization: '',
      };
      headerString.Authorization = this.sendTokenAs + ' ' + token;
      return headerString;
    }
    return null;
  }

  async flyer(url: RequestInfo | URL | undefined, data: RequestInit | undefined) {
    try {
      if (url) {
        const response = await fetch(url, data);
        const resData = await response.json();
        const res = {
          response,
          data: resData,
        };
        return Promise.resolve(res);
      }
      return Promise.reject('Request url undefined, are you sure you defined your baseUrl');
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Checks if an object is empty
   * @param {object} obj The object to check
   * @returns bool
   */
  isEmpty(obj: object) {
    if (!obj) {
      return true;
    } else if (Object.keys(obj).length === 0) {
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
  _setBody(body?: object, config?: RequestInit) {
    if (body && config) {
      config.body = JSON.stringify(body);
    }
    return config;
  }

  _setType(config: RequestInit, type: string | null) {
    // set the request method
    if (config && !('type' in config)) {
      config.method = type?.toUpperCase();
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

    return { ...this.headers, ...obj };
  }

  _setHeaders(headers: HeadersInit | undefined) {
    return { ...this._getHeaders(), ...headers };
  }

  _setUrl(url?: string) {
    if (this.baseUrl) {
      let newBase = this.baseUrl;
      let newLink = url;
      if (newBase.charAt(newBase.length - 1) !== '/') {
        newBase = newBase + '/';
      }
      if (newLink?.charAt(0) === '/') {
        newLink = newLink.substring(1, newLink.length - 1);
      }
      return `${newBase}${newLink}`;
    }
    return url;
  }

  _extractHeadersFromConfigs(config: RequestInit) {
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
        this._setHeaders({ Authorization: auth?.Authorization });
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
  _populateData(type = 'GET', body?: any, headers?: any, configs?: any, secure = false) {
    // set the body if the request is not get
    let newConfigs: RequestInit = {};
    if (body && type !== 'GET') {
      newConfigs = { ...configs, ...this._setBody(body, configs) };
    }
    // attach the headers
    if (headers != null && configs) {
      configs.headers = this._setHeaders(headers);
    }

    newConfigs = { ...configs, ...this._setType(configs, type) };

    this._extractHeadersFromConfigs(newConfigs);

    if (secure) {
      // if it a secure request, attach the token
      this.__attach_auth();
    }

    newConfigs.headers = this.headers;
    return configs;
  }

  _requestDefinition(
    url: string | undefined,
    type: string | undefined,
    body: any,
    headers: any,
    config: any,
    secure = false,
  ) {
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
  async get(url?: string, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'GET', null, headers, config);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Makes a secure GET request to the server
   * @author jet2018
   * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
   * @param {object} headers Request headers
   * @param {object} config The request configuration
   * @returns Promise
   */
  async gets(url?: string, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'GET', null, headers, config, true);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async post(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'POST', body, headers, config);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async posts(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'POST', body, headers, config, true);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async patch(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'PATCH', body, headers, config);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async patchs(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'PATCH', body, headers, config, true);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async put(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'PUT', body, headers, config);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async puts(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'PUT', body, headers, config, true);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async delete(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined) {
    const { newUrl, data } = this._requestDefinition(url, 'DELETE', body, headers, config);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async deletes(
    url?: string,
    body?: object | null,
    headers?: HeadersInit | undefined,
    config?: RequestInit | undefined,
  ) {
    const { newUrl, data } = this._requestDefinition(url, 'DELETE', body, headers, config, true);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
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
  async custom(
    url: string,
    type: string,
    body?: object | null,
    headers?: HeadersInit | undefined,
    config?: RequestInit | undefined,
    secure = false,
  ) {
    const { newUrl, data } = this._requestDefinition(url, type, body, headers, config, secure);
    try {
      return this.flyer(newUrl, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
