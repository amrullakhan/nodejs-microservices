const startServer = async (app: any, port: any, connectDB: any, serviceDiscoverer: any) => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database');

    console.log('Starting server...');

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    if (serviceDiscoverer) {
      serviceDiscoverer('product-service', port);
    }
  } catch (error) {
    console.log(error);
  }
};

export default startServer;