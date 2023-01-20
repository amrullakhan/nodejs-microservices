const Hapi = require('hapi');
const Eureka = require('eureka-js-client').Eureka;
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;
const hostName = process.env.HOSTNAME || "localhost";
const eurekaHost = process.env.EUREKA_HOST || "localhost";
const eurekaPort = 8761;
const ipAddr = "172.0.0.1";

const loadbalancer = () => {
    let currentInstance = 0;
    const getUrl = (urls) => {
        const url = urls[currentInstance];
        currentInstance = (currentInstance + 1) % urls.length;
        return url;
    };
    return Object.freeze({
        getUrl
    });
}

const getEurekaURL = (instances, restPath) => {
    return instances.map(int => "http://" +
        int.hostName +
        ":" +
        int.port["$"] +
        restPath);
};

const init = async () => {
    const server = Hapi.server({
        port: PORT,
        host: hostName
    });


    const eureka = new Eureka({
        instance: {
            app: 'api-gateway',
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                $: PORT,
                '@enabled': true,
            },
            vipAddress: 'api-gateway',
            dataCenterInfo: {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn",
            },
        },
        eureka: {
            host: eurekaHost,
            port: eurekaPort,
            servicePath: "/eureka/apps",
            maxRetries: 10,
            requestRetryDelay: 1000,
            preferIpAddress: true,
        }
    });

    eureka.start((error) => {
        if (error) {
            console.error(errorr);
            return;
        }
        console.log('Eureka client started');
    });

    const productServiceURLGetter = loadbalancer();
    const orderServiceURLGetter = loadbalancer();

    server.route({
        method: '*',
        path: '/api/{any*}',
        handler: async (request, h) => {
            try {
                const path = request.path;
                if (path.includes('/products')) {
                    let productService = eureka.getInstancesByAppId('product-service');
                    let serviceUrls = getEurekaURL(productService, path.substring(path.indexOf('/products')));
                    const selectedUrl = productServiceURLGetter.getUrl(serviceUrls);
                    const options = { method: request.method };
                    if (request.payload) {
                        options.body = JSON.stringify(request.payload);
                        options.headers = { 'Content-Type': 'application/json' };
                    }
                    const res = await fetch(selectedUrl, options);
                    const data = await res.json();

                    return data;

                    // return response.result;
                } else if (path.includes('/orders')) {
                    let orderService = eureka.getInstancesByAppId('order-service');
                    let serviceUrls = getEurekaURL(orderService, path.substring(path.indexOf('/orders')));
                    const selectedUrl = orderServiceURLGetter.getUrl(serviceUrls);
                    const options = { method: request.method };
                    if (request.payload) {
                        options.body = JSON.stringify(request.payload);
                        options.headers = { 'Content-Type': 'application/json' };
                    }
                    const res = await fetch(selectedUrl, options);
                    const data = await res.json();

                    return data;
                } else {
                    return h.response('404 Error! Not Found').code(404);
                }
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    });

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
