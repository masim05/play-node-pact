# Intro

The Mocha example is a really simple demonstration of the use of Pact in Mocha tests.

Based on https://github.com/pact-foundation/pact-js

# The example
Let's say we have several services communicating to each other and
one of the communications is fetching information about dogs.
Here we have service A which provides HTTP API for that (it is so called
`provider` in pact's terminology) and service B which consumes it (aka
`consumer`). Pact is a useful framework to test such communications,
this approach is called `contract testing`.

## Provider
Provider is an HTTP API service (source is at `src/service-A-provider`)
which supports two routes:
 - `GET /dogs`
 - `GET /dogs/:id`

Dogs model in the server's world looks like:
```
{
    id: 1,
    name: 'Cherry',
    breed: 'pug'
}
```

## Consumer
Consumer is an HTTP client (source is at `src/service-B-consumer`) which
expect some response but cares only about names actually (as we see from
specs).

## Workflow
### Consumer logic and pactfile generation
Pact is a consumer driven tool. This means that we need to start with
consumer test. We need initialize the mock provider and
describe interactions with it. Pay attention to `dir` option, this is
the place to store pactfile to.
Run the test
```
mocha src/service-B-consumer/get-dogs.spec.js
```  
If pactfile `pacts/myconsumer-myprovider.json` wouldn't exist the command
would create it.

### Share the pactfile
Now we need to use the pactfile in order to test provider. We need to
share the pactfile for this. There are several ways to do it, we will
use the simpliest one: make `pactUrls` option to point to
`pacts/myconsumer-myprovider.json`.
### Test provider against the pactfile
`src/service-A-provider/serve-dogs.spec.js` is a provider spec. Take a
look at `pactUrls`: it points to the file generated previously. Now we
can run tests for the server as well:
```
mocha src/service-A-provider/serve-dogs.spec.js
```
Passed!

## Conclusion
This simple example shows how pact can be bootstraped. More details are
here https://docs.pact.io/.
