## About jet-fetch library

jet-fetch provides a wrapper class for the [fetch]("https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"). It can be somehow tricky to use fetch API especially for a beginner. However, this library provides a simple way to use fetch API. The package is fully customizable using its `custom` method that enables you customize the whole API

> Anouncing version 1.1.2 which came with a full migration to typescript, addition of tests, and support of caching for `get` and `gets` request.

The package ships with the five commonly used http methods but has room for expansion. It covers:-

```
GET
POST
PUT
DELETE
PATCH
```

The above are supported by default as they seem to be the commonly used methods.

The plugin is totally customizable and therefore can be simple to play with.

With a good knowledge of the fetch API, you can easily implement your own fashion of the library.

## Installation

With npm, simply run

```bash
npm i jet-fetch
```

or with yarn

```bash
yarn add jet-fetch
```

## Defaults

The library provides various defaults out of the box. All of which can also be overwritten.

Examples.

1. The library by default will allow `cors` if you do not manually set them.
   This can be overriden by setting `cors` to `true` and then defining your custom `Access-Control-Allow-Origin` which will also default to `*`.
2. Defaults to returning the response as a `JSON` object.

```JS
response  = {
    'response': response,
    'data': resData
}
```

On `response`, that's where you can find the `response` object. such as `status`, `statusText`, `headers`, `ok`, `redirected`, `type`, `url`, `body`, `bodyUsed`. For more about this, just read above above mentioned fetch API.

Whereas on `data`, that's where you can find the `data` object. which represents the actual data from your server.

### Class instatiation.

Previous versions did not have the `options`, but with TypeScript, an interface of the options has been added on class instatiation.

Options.

```ts
interface Configuration {
  baseUrl: string;
  interceptWithJWTAuth?: boolean;
  token?: any;
  tokenBearerKey?: string;
  sendTokenAs?: string;
  defaultHeaders?: HeadersInit;
  cachable?: boolean;
}
```

<table>
<thead>
<th>Param</th>
<th>Default</th>
<th>Required</th>
<th>Use</th>
</thead>
<tbody>
<tr>
  <td>baseUrl</td>
  <td>-</td>
  <td>false</td>
  <td>The base url the entire package will rely on.</td>
</tr>
<tr>
  <td>interceptWithJWTAuth</td>
  <td>false</td>
  <td>false</td>
  <td>If true, the package will attempt attaching the jwt token as explained in the following guide</td>
</tr>
<tr>
  <td>token</td>
  <td>-</td>
  <td>false</td>
  <td>This can be any source of token like a function to execute to obtain, a token itself, once provided, the package won't be checking localstorage for any token, but will always refer to it for the token, for every secure request, the value of this param will be used as the jwt</td>
</tr>
<tr>
  <td>sendTokenAs</td>
  <td>'Bearer'</td>
  <td>false</td>
  <td>This is how the token will be sent to the backend, in short, this is how your backend expects your token and it defaults to 'Bearer' and by convention, it should be one of Bearer, Jwt, Token, but you can pass it as anything you want or empty "" to send nothing in its position</td>
</tr>
<tr>
  <td>tokenBearerKey</td>
  <td>'SecretKey'</td>
  <td>false</td>
  <td>Defines how the token is stored in your localstorage, this will be the key to check for in the localstorage and defaults to 'SecretKey'. This assumes that you keep your key in localStorage and you want the library to pick it for you on secure requests</td>
</tr>
<tr>
  <td>defaultHeaders</td>
  <td>{}</td>
  <td>false</td>
  <td>These are headers you want to be common to all requests, you can override these by re-defining the same in the subsequent request, those will overrride what you had declared on initialisation. Defaults to an empty object. Any valid fetch is allowed heres</td>
</tr>
<tr>
  <td>cachable</td>
  <td>true</td>
  <td>false</td>
  <td>This makes requests cached thus improving the perfomance of the request. Once its on, it adds the {'cache': 'default'} to the headers, and once turned off, it turns the same to 'no-cache'. Still this can be overriden by passing the cache header on your subsequent request headers. To globally disable caching, turn this off. However, defining the header on subsequent will turn caching back on.</td>
</tr>
</tbody>
</table>

## Implementation

```js
import { Jet } from 'jet-fetch'; // get the right way for importing this, but remember it is an es5+ module.

let jet = new Jet({
  baseUrl: "http://mycooldomain.com/api/";
  interceptWithJWTAuth: true;
  token: null;
  tokenBearerKey: "SecretKey";
  sendTokenAs: "Bearer";
  defaultHeaders: {};
  cachable: true;
});
```

## With JWT Authentication in mind

The library comes with full support for JWT authentication.

## Interception with JWT Authentication

We understand that most modern platforms are using Bearer Tokens or JWT or OAuth for securing their platforms therefore, the library ships in with amazing and simple to use tools for this.

### Instantiating with JWT in mind

If your app is using JWT authentication, which in most cases will be stored in `localstorage` as `Bearer`, you can define your `Jet` class as below. If this is the case for you, then the code below is enough for you.

```JS

import {Jet} from 'jet-fetch';

const jet = new Jet({
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true // notice this.
})
```

With just the above, the library will try to load the JWT from the localstorage, send it to the backend as "Bearer \<token from the localstorage>" and add to your "Authorization" header attribute.

### Customising the above

If your backend, for example, does not expect the token as `Bearer`, maybe it expects it as `Token` or `JWT`, then your class should have an additional parameter `sendTokenAs` and if not defined, it will always default to `Bearer`.

Example:

```JS
import {Jet} from 'jet-fetch';

const jet = new Jet({
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true,
  sendTokenAs="Token" // notice this
})
```

If your token is not stored as `Bearer` in your localstorage, maybe you keep it as `secretkey`, then you call tell the package to look for that like this.

```JS
import {Jet} from 'jet-fetch';

const jet = new Jet({
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true,
  tokenBearerKey="secretkey" // notice this
})
```

**_NOTE:_** The above still expects your token to be stored in localstorage, but this is sometimes not the case, you can store you token anywhere!! The above may not help, read ahead to customise that.

### Full Customising of the above

The above will work well when your token is in your localstorage.

But imagine one who is keeping this token in maybe sessionStorage, realm db or anywhere!.

Then it is also possible to define your interception with your own source of code like below. Remember this should be done on class instatiation otherwise it may break.

As long as your functionality, once executed, returns the code, the below will work fine.

```JS
import { Jet } from 'jet-fetch';

// here the user is getting the token from the sessionStorage.
let my_token = null
try{
  my_token = sessionStorage.getItem("token")
}catch(err){
  // the token is not available
}

const jet = new Jet({
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true,
  token = my_token // notice this
})
```

NOTE: When `token` is defined in the class, it will take precendence of the rest of the parameters you pass except `interceptWithJWTAuth`. Which means, the library won't be checking in your localstorage at all.

But with this last one, Remember our token will be sent as `Bearer`, to customize that, just like as explained above, define your `sendTokenAs`. in the class instantiation.

```JS
import { Jet } from 'jet-fetch';

// here the user is getting the token from the sessionStorage.
let my_token = null
try{
  my_token = sessionStorage.getItem("token")
}catch(err){
  // the token is not available
}

const jet = new Jet({
  baseUrl: "https:your-cool-base-url.com"
  token: my_token
  sendTokenAs: "JWT" // notice this
})


```

## Turning on and off of caching.

NOTE:- Caching only works for `get` and `gets` requests and you should never any other requests.

To turn off caches, then this is enough. With this in place, for every `get` or `gets` request, then the browser will not check from the cache and won't also save the response it obtains back.

```JS
import { Jet } from 'jet-fetch';

const jet = new Jet({
 // ...
  cachable: false // notice this
})

```

By default caches are turned on, which implies the browser will check if there is any fresh cache (will dispose off slate caches) and return that otherwise, it will make the request to the server, obtain the response and add it to the cache for future use.

If it is not so much necessary, please leave this feature turned to true for performance enhancements.

Now, after fully defining your `Jet` instance, you can then export it and start using it in the rest of your application.

```JS
import { Jet } from 'jet-fetch';


//.....

export default jet;
```

## Performing Requests --with examples

The following examples assume you have already initailized the library. For all the examples below, `headers` and `config` is optional.

### GET

#### NOTE: `GET` requests do not support passing in the body

```JS
jet.
  get(url="users")
  .then(res => console.log(res.data))
  .catch(err => console.debug(res.response.statusText))
```

### POST

```JS
let data = {username: "jet", password:12345}

jet.
  post("users", data,)
  .then(res => res.data)

```

The plugin support by default `GET`, `PUT`, `POST`, `DELETE`, `PATCH`
as illustrated above.

## Defining custom request methods

If the request method you are looking for is not provided among the top five, you can define your own request method.

```js
/**
 * @param url is your request url to use, can be absolute or relative to the baseUrl, it will only depend on if you defined your baseUrl.
 * @param type is the request type, can be GET, HEAD etc
 * @param body is the body of your request
 * @param headers are the headers specific to this request.
 * @param configs any other fetch config options you would like to pass
 */
jet
  .custom(url, type, body?, headers?, configs?)
  .then((res) => {
    // do something with the response
  })
  .catch((err) => {
    // do something with the error
  });
```

> All the above mentioned methods won't trigger any checking of the JWT token according to your settings, however, secure counterparts of each method have also been added. Calling these with the same data will actually trigger checking for the token and passing it in the headers as Authorization header.

The seperation is to improve the performance so that those endpoints that don't require the token should not even check for it at all.

Use the following to enable the JWT functionalities:-

```js
import { Jet } from 'jet-fetch';
const jet = new Jet(...options);
jet.gets();
jet.posts();
jet.patchs();
jet.puts();
jet.deletes();
```

Note: You only pluralize the previous method by adding s -- for secure to start checking for JWT token.

This is still available on the `custom` method.

```js
jet.custom(url, type, body, headers, configs, secure);
```

Note: The new param `secure` added to make a custom request that will actually check for the token. Pass this as true, omit it or pass it as false to omit checking.

## Tests.

From version 1.1.2, Jest-powered tests were added to the package and to run them, just run :-

```shell
npm test
```

Good luck with the new way of having fun with `APIs`.

Most of the scenarios are summarised in 5 tests, which by end will have run every single line of the package thus being bug-free.

## Contributing

Thanks to those that have tested the Plugin and contributed and we still welcome more..!

To contribute, fork this repo, make your changes, test them and then make a pull request.

## License

[MIT LICENSE](LICENSE)
