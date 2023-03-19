## About jet-fetch library

jet-fetch provides a wrapper class for the [fetch]("https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"). It can be somehow tricky to use fetch API especially for a beginner. However, this library provides a simple way to use fetch API. The package is fully customizable using its `custom` method that enables you customize the whole API

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

## _Defaults_

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

On `response`, that's where you can find the `response` object. such as `status`, `statusText`, `headers`, `ok`, `redirected`, `type`, `url`, `body`, `bodyUsed`.

Whereas on `data`, that's where you can find the `data` object. which represents the actual data from the server.

`baseUrl` can be defined while instatiating the Jet class, this will be the base url for all the requests.

## _Usage_

```js
import Jet from 'jet-fetch'


let jet = new Jet(baseUrl="" // optional
));

```

## With JWT Authentication in mind

The library comes with full support for JWT authentication.

## Interception with JWT Authentication

We understand that most modern platforms are using Bearer Tokens or JWT or OAuth for securing their platforms therefore, the library ships in with amazing and simple to use tools for this.

### Instantiating with JWT in mind

If your app is using JWT authentication, which in most cases will be stored in `localstorage` as `Bearer`, you can define your `Jet` class as below. If this is the case for you, then the code below is enough for you.

```JS

import Jet from 'jet-fetch';

const jet = new Jet(
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true // notice this.
  )
```

With just the above, the library will try to load the JWT from the localstorage, send it to the backend as "Bearer \<token from the localstorage>" and add to your "Authorization" header attribute.

### Customising the above

If your backend, for example, does not expect the token as `Bearer`, maybe it expects it as `Token` or `JWT`, then your class should have an additional parameter `sendTokenAs` and if not defined, it will always default to `Bearer`.

Example:

```JS
import Jet from 'jet-fetch';

const jet = new Jet(
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true,
  sendTokenAs="Token" // notice this
)
```

If your token is not stored as `Bearer` in your localstorage, maybe you keep it as `secretkey`, then you call tell the package to look for that like this.

```JS
import Jet from 'jet-fetch';

const jet = new Jet(
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true,
  tokenBearerKey="secretkey" // notice this
)
```

***NOTE:*** The above still expects your token to be stored in localstorage, but this is sometimes not the case, you can store you token anywhere!! The above may not help, read ahead to customise that.

### Full Customising of the above

The above will work well when your token is in your localstorage.

But imagine one who is keeping this token in maybe sessionStorage, realm db or anywhere!.

Then it is also possible to define your interception with your own source of code like below. Remember this should be done on class instatiation otherwise it may break.

As long as your functionality, once executed, returns the code, the below will work fine.

```JS
import Jet from 'jet-fetch';

// here the user is getting the token from the sessionStorage.
let my_token = sessionStorage.getItem("token")

const jet = new Jet(
  baseUrl = "https:your-cool-base-url.com",
  interceptWithJWTAuth = true,
  token = my_token // notice this
)
```

NOTE: When `token` is defined in the class, it will take precendence of the rest of the parameters you pass except `interceptWithJWTAuth`. Which means, the library won't be checking in your localstorage at all.

But with this last one, Remember our token will be sent as `Bearer`, to customize that, just like as explained above, define your `sendTokenAs`. in the class instantiation.

```JS
import Jet from 'jet-fetch';

// here the user is getting the token from the sessionStorage.
let my_token = sessionStorage.getItem("token")

const jet = new Jet
jet.baseUrl = "https:your-cool-base-url.com"
jet.token = my_token
jet.sendTokenAs ="JWT" // notice this

```

Now, after fully defining your `Jet` instance, you can then export it and start using it in the rest of your application.

```JS
import Jet from 'jet-fetch';

// here the user is getting the token from the sessionStorage.
let my_token = sessionStorage.getItem("token")

const jet =  new Jet
jet.baseUrl = "https:your-cool-base-url.com"
jet.token = my_token
jet.sendTokenAs ="JWT"

export default jet;
```

## Performing Requests --with examples

The following examples assume you have already initailized the library. For all the examples below, `headers` and `config` is optional.

### GET

#### NOTE: `GET` requests do not support passing in the body

```JS
jet.
  get(url="users", headers={}, config={})
  .then(res => console.log(res.data))
  .catch(err => console.debug(res.response.statusText))
```

### POST

```JS
let data = {username: "jet", password:12345}

jet.
  post("users", data, headers={}, config={})
  .then(res => res.data)

```

The plugin support by default `GET`, `PUT`, `POST`, `DELETE`, `PATCH`
as illustrated above.

## Defining custom request methods

If the request method you are looking for is not provided among the top five, you can define your own request method.

```js
// define your own request method
// type is the name of the method eg 'HEAD'
// body refers to the body of the request
// headers refers to the request headers
// config refers to any other valid request configurations
// url refers to the url of the request, can be a relative url or an absolute url (relative to the baseUrl)
jet
  .custom(url, type, body = {}, headers={}, config = {})
  .then((res) => {
    // do something with the response
  })
  .catch((err) => {
    // do something with the error
  });
```

# Breaking changes in version 1.0.8

Previously, all the request methods were intercepted with jwtAuthentication, which meant, that for every request, whether there is a JWT or not, the library continuosly checked for the token, hence an additional small execution microseconds.

Now, every request method comes with its secure counterpart that does the checking.

### Example

To make these requests that won't check for the token, you use the following:-

```js
jet.get()
jet.post()
jet.patch()
jet.put()
jet.delete()
```

To make the secure counterparts:-

```js
jet.gets()
jet.posts()
jet.patchs()
jet.puts()
jet.deletes()
```

Note: You only pluralize the previous method by adding s -- for secure to start checking for JWT token.

This is still available on the custom method.

```js
jet.custom(url, type, body = {}, headers={}, config = {}, secure=false)
```

Note: The new param `secure` added to make a custom request that will actually check for the token.

Goodluck with the new way of having fun with `APIs`.

## Contributing

Thanks to those have tested the Plugin and contributed and we still welcome more..!

To contribute, fork this repo, make your changes, test them and then make a pull request.

## License

[MIT LICENSE](LICENSE)
