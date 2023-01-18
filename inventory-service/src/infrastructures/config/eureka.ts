import { Eureka } from "eureka-js-client";

const hostName = process.env.HOSTNAME || "localhost";
const eurekaHost = process.env.EUREKA_HOST || "localhost";
const eurekaPort = 8761;
const ipAddr = "172.0.0.1";

export const registerWithEureka = (appName: string, PORT: number) => {
  const client = new Eureka({
    instance: {
      app: appName,
      hostName: hostName,
      ipAddr: ipAddr,
      port: {
        $: PORT,
        "@enabled": true,
      },
      vipAddress: appName,
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: "/eureka/apps/",
      maxRetries: 10,
      requestRetryDelay: 1000,
    },
  });

  client.start((error) => {
    console.log(error || "Node Eureka registration complete");
  });

  function exitHandler(options: any, exitCode: any) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
        client.stop();
    }
  }

  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
};
