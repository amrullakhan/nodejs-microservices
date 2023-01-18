import fetch from "node-fetch";
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
      preferIpAddress: true,
    },
  });

  client.start((error: any) => {
    console.log(error || "Node Eureka registration complete");
  });

  const cClient = client as any;

  cClient.logger.level("debug");
  cClient.on("started", () => {
    console.log("-----------------started");
  });
  cClient.on("registered", () => {
    console.log("-----------------registered");
  });
  cClient.on("deregistered", () => {
    console.log("-----------------deregistered");
  });
  cClient.on("heartbeat", () => {
    console.log("-----------------heartbeat");
  });
  cClient.on("registryUpdated", () => {
    console.log("-----------------registryUpdated");
  });

  function exitHandler(options: any, exitCode: any) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
      client.stop();
    }
  }

  process.on("SIGINT", exitHandler.bind(null, { exit: true }));

  let currentInstance = 0;
  const getInventoryServiceURL = () => {
    const int = JSON.parse(
      JSON.stringify(client.getInstancesByAppId("inventory-service"))
    );
    const url =
      "http://" +
      int[currentInstance].hostName +
      ":" +
      int[currentInstance].port["$"] +
      "/inventorys";
    currentInstance = (currentInstance + 1) % int.length;
    return url;
  };

  return getInventoryServiceURL;

  // setInterval(() => {
  //   console.log(JSON.stringify(client.getInstancesByAppId('inventory-service')), JSON.stringify(client.getInstancesByVipAddress('inventory-service')));
  // }, 5000);
};
