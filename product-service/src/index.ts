import {config} from './infrastructures/config';
import app from './app';
import {connectDB} from './infrastructures/data';
import startServer from './server';

startServer(app, process.env.port || 3000, connectDB, config.serviceDiscoverer);
