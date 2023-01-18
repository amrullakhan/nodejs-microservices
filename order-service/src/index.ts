import {config} from './infrastructures/config';
import {makeApp} from './app';
import {connectDB} from './infrastructures/data';
import startServer from './server';

startServer(makeApp, process.env.port || 3000, connectDB, config.serviceDiscoverer);
