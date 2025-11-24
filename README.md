# Proxy-Chain - Remove Authorization From Forward Proxy

This docker image is to create anonymous forward proxy server from a given upstream proxy URL that may require authorization.

## How to run

### Install Required Packages

```bash
npm ci
```

### Run The Server

I am using an example proxy URL pattern from [NodeMaven](https://nodemaven.com/), you can use your own.

```bash
UPSTREAM=http://USERNAME-country-bd-ipv4-true-sid-SESSION_ID:PASSWORD@gate.nodemaven.com:8080 node src/server.js
```

## In Docker


```bash
docker build . -t chitholian/proxy-chain

docker run -p 3210:3210 --rm -it -e UPSTREAM=http://USERNAME-country-bd-ipv4-true-sid-SESSION_ID:PASSWORD@gate.nodemaven.com:8080 chitholian/proxy-chain:latest 
```

You can use http://localhost:3210 as a proxy URL in your app e.g., web browser. It will help not asking the username/password for proxy authorization.
