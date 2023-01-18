const startServer = async (makeApp: any, port: any, connectDB: any, serviceDiscoverer: any) => {
  try {
    let inventoryServiceURLFn = null;
    if (serviceDiscoverer) {
      inventoryServiceURLFn = serviceDiscoverer('order-service', port);
    }

    const app = makeApp(inventoryServiceURLFn);

    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database');

    console.log('Starting server...');

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default startServer;