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
### Share the pactfile
### Test provider against the pactfile
