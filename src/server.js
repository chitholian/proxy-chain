const http = require('http');
const https = require('https');
const ProxyChain = require('proxy-chain');

const upstreamUrl = process.env.UPSTREAM
if (!upstreamUrl) {
    console.error('UPSTREAM environment variable need to be set');
    process.exit(1);
}

// Create agents with keepAlive to enable connection pooling
const httpAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 512,
});

const httpsAgent = new https.Agent({
    keepAlive: true,
    maxSockets: 512,
});

const server = new ProxyChain.Server({
    port: process.env.PORT || 3210,
    prepareRequestFunction: ({ request }) => {
        return {
            upstreamProxyUrl: upstreamUrl,
            // Agents enable connection pooling to upstream proxy
            httpAgent,    // Used for HTTP upstream proxies
            httpsAgent,   // Used for HTTPS upstream proxies
        };
    },
});

server.listen(() => {
    console.log(`Proxy server is listening on port ${server.port}`);
});

const stopNow = () => {
    console.log('Exiting due to signal...');
    server.close();
    process.exit(0);
}

process.once('SIGINT', stopNow);
process.once('SIGTERM', stopNow);
