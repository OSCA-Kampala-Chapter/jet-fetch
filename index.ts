import fetch from  "node-fetch"

class Jet {
    baseUrl: any
    interceptWithJWTAuth: boolean
    token: null
    tokenBearerKey: string
    sendTokenAs: string
    headers: object

    constructor(baseUrl = null, interceptWithJWTAuth=false, token=null, tokenBearerKey="Bearer", sendTokenAs="Bearer") {
        this.baseUrl = baseUrl
        this.interceptWithJWTAuth = interceptWithJWTAuth
        this.token = token
        this.tokenBearerKey = tokenBearerKey
        this.sendTokenAs = sendTokenAs
    }

    attachAuthorisation() {
        // if the dev provided the token, use that, otherwise, attempt to get it from the localstorage
        let token = this.token ? this.token:  localStorage.getItem(this.tokenBearerKey)
        if (token) {
            return this.generateAuthHeader(this.token)
        }
        return null
    }


    generateAuthHeader(token:any = null) {
        let _header_string = {}
        if (this.sendTokenAs && token) {
            return _header_string['Authorization'] = this.sendTokenAs + " " + token
        }
        return null
    }

    /**
     * 
     * @param url This overall url to use for this request
     * @param data The final config object. This consists of the data, headers, and other configs
     * @returns Promise
     */
    async flyer(url: string|null, data: object ={}) {
        try {
            const response = await fetch(url, data)
            const resData = await response.json()
            const res = {
                'response': response,
                'data': resData
            }
            return Promise.resolve(res)
        } catch (err) {
            return Promise.reject(err)
        }
    }

     /**
    * Checks if an object is empty
    * @param {object} obj The object to check
    * @returns bool 
    * */
    isEmpty(obj:object|null) {
        if (!obj) {
            return true
        } else if (Object.keys(obj).length === 0) {
            return true
        }
        return false
    }

    /**
     * Sets the body part of the request
     * @returns Object -> Configuration with body combined
     */
    _setBody(body:object|null, config:object|null = {}) {
        if (body!=null && !this.isEmpty(body) && config) {
            config['body'] = JSON.stringify(body)
        }
        return config
    }
    
    /**
     * If the user already defined the type in the config, use that instead
     * @param config 
     * @param type 
     * @returns 
     */
    _setType(config:object|null, type:string = "GET") {
        //set the request method
        if (config && !("type" in config)) {
            config['method'] = type.toUpperCase()
        }
        return config
    }

    _getHeaders() {
        return this.headers
    }

    _setHeaders(headers = {}) {
        return { ...this._getHeaders(), ...headers }
    }

    _setUrl(url:string = "") {
        if (this.baseUrl) {
            let newBase = this.baseUrl
            let newLink = url
            if (newBase.charAt(newBase.length - 1) !== "/") {
                newBase = newBase+"/"
            }
            if (newLink.charAt(0) == "/") {
                newLink = newLink.substring(1, newLink.length -1)
            }
            return `${newBase}${newLink}`
        }
        return url
    }

     _extractHeadersFromConfigs(config={}) {
        let config_keys = Object.keys(config)

        if (config_keys.length > 0 && config_keys.includes("headers")) {
            this._setHeaders(config['headers'])
        }

         // set allowed origins, otherwise will default to all
        if (!("Access-Control-Allow-Origin" in this.headers) || "cors" in config) {
            this._setHeaders({ 'Access-Control-Allow-Origin' : "*"})
        }
        // set the default content-type to application/json if non was provided
        if (!("Content-Type" in this.headers)) {
            this._setHeaders({ 'Content-Type' : 'application/json'})
        }
        
        return this.headers
     }
    
    
     __attach_auth() {
        if (this.interceptWithJWTAuth) {
            let auth = this.attachAuthorisation()
            // if it has something from auth, lets use it 
            if (auth && !("Authorization" in this.headers)) {
                this._setHeaders({ 'Authorization' : auth['Authorization']})
            }
        }

        return this.headers
     }
    
    
    /**
    * Populates the body and configurations of the request, should not be called directly from the instannce
    * @protected
    * @param {object} body Request body/data
    * @author jet2018
    * @param {object} configs Request configurations such as headers and any other settings
    * @param headers Request headers
    * @param {string} type Request type, that is, post, get, put ...
    * @returns Object
    */
    _populateData(type: string = "GET", body:object|null, headers:object|null, configs:object|null, secure = false) {
        // set the body if the request is not get
        if (body !== null && type !== "GET") {
            configs = {...configs, ...this._setBody(body, configs) }
        }
        // attach the headers
        if (headers != null) {
            configs = { ...configs, ...this._setHeaders(headers) }
        }
        configs = { ...configs, ...this._setType(configs, type) }

        this._extractHeadersFromConfigs(configs)

        if (secure) {
            // if it a secure request, attach the token
            this.__attach_auth()
        }

        configs['headers'] = this.headers
        return configs
    }


    _requestDefinition(url:string|null, type:string, body:object | null, headers: object | null, config: object | null, secure=false) {
        const newUrl = this._setUrl(url||"")
        const data = this._populateData(type, body, headers, config, secure)
        return { newUrl, data }
    }


     /**
    * Makes a GET request to the server
    * @author jet2018
    * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it 
    * @param {object} headers Request headers
    * @param {object} config The request configuration
    * @returns Promise
    */
    async get(url:string|null, headers: object = {}, config: object = {}) {
        const {newUrl, data} = this._requestDefinition(url, "GET", null, headers, config)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async gets(url: string|null, headers: object = {}, config: object = {}) {
        const {newUrl, data} = this._requestDefinition(url, "GET", null, headers, config, true)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async post(url: string|null, body: object = {},  headers: object={}, config: object = {}) {
        const { newUrl, data } = this._requestDefinition(url, "POST", body, headers, config)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async posts(url: string|null, body: object = {},  headers: object={}, config: object = {}) {
        const { newUrl, data } = this._requestDefinition(url, "POST", body, headers, config, true)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async patch(url: string|null, body: object = {},  headers: object={}, config: object = {}) {
        const {newUrl, data} = this._requestDefinition(url, "PATCH", body, headers, config)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async patchs(url: string|null, body: object = {},  headers: object={}, config: object = {}) {
        const {newUrl, data} = this._requestDefinition(url, "PATCH", body, headers, config, true)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async put(url: string|null, body: object = {}, headers: object={}, config: object = {}) {
        const { newUrl, data } = this._requestDefinition(url, "PUT", body, headers, config)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async puts(url: string|null, body: object = {}, headers: object={}, config: object = {}) {
        const { newUrl, data } = this._requestDefinition(url, "PUT", body, headers, config, true)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async delete(url: string|null, body: object = {}, headers: object={}, config: object = {}) {
        const {newUrl, data} = this._requestDefinition(url, "DELETE", body, headers, config)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async deletes(url: string|null, body: object = {}, headers: object={}, config: object = {}) {
        const {newUrl, data} = this._requestDefinition(url, "DELETE", body, headers, config, true)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
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
    async custom(url: string|null, type: string, body: object = {}, headers: object={}, config: object = {}, secure: boolean=false) {
        const {newUrl, data} = this._requestDefinition(url, type, body, headers, config, secure)
        try {
            return this.flyer(newUrl, data)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}


export default Jet