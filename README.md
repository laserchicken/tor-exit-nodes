# Tor Exit Nodes

This service checks whether given IPv4 address is a [Tor](https://www.torproject.org/) exit node.

API of the service responds:
- with `HTTP 200 OK` and empty body on `HEAD /A.B.C.D` request when provided IP is a Tor exit node
- with `HTTP 404 Not Found` and empty body on `HEAD /A.B.C.D` request when provided IP *is not* a Tor exit node

- with `HTTP 200 OK` and JSON body (`exitNode, lastStatus, published, exitAddress`) on `GET /A.B.C.D` request when provided IP is a Tor exit node
- with `HTTP 404 Not Found` and empty body on `GET /A.B.C.D` request when provided IP is not a Tor exit node

It synchronizes https://check.torproject.org/exit-addresses regularly and stores it in redis cache:

![api](https://github.com/laserchicken/tor-exit-nodes/raw/main/doc/diagram.jpg)

## Tech stack

Api is based on [express.js](http://expressjs.com/). Exit nodes synchronization [worker](src/worker.js) uses [node-cron](https://github.com/node-cron/node-cron) package for scheduling, under the hood it basically forks a child node process. Worker and api processes communicate through redis ([node-redis package](https://github.com/NodeRedis/node-redis)), which also serves as a cache. You can customize cache expiration time and cron schedule with env variables (both are set to 30 minutes by default).

## Development

Run it with docker-compose:

```
docker compose up
```

now you can query the api, for example:

```
curl --head http://localhost:3000/176.10.99.200
```

unit tests:

```
npm run test
```

## TODO

- end to end testing with mocked https://check.torproject.org/exit-addresses endpoint
- add another endpoint for [dnsel](https://2019.www.torproject.org/projects/tordnsel.html.en) lookup
