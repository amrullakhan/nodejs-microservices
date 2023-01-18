import {registerWithEureka} from './eureka';

export const config = {
    serviceDiscoverer: registerWithEureka,
};
