# Folder Structure - Clean Architecture

## src:

This is the root of the project. All the other directories are inside this directory.

- **entities**: This folder contains the core business entities, such as data models, that are independent of any specific technology or framework.
- **models**: This folder contains the schema and models of the entities in the application.
- **valueObject**: This folder contains the Value Objects, which are simple objects that have a value but no identity.
- **enums**: This folder contains the enums used in the application

### useCases:

This folder contains the application-specific business logic.

- **services**: This folder contains the business logic of the application, for example the services that handle the CRUD operations.
- **interfaces**: This folder contains the interfaces that define the contracts for the services.

### interfaceAdapters:

This folder adapts the use cases and entities to the specific technology or framework being used.

- **controllers**: This folder contains the controllers that handle the incoming HTTP requests and return appropriate HTTP responses.
- **input**: This folder contains the input validation logic.
- **output**: This folder contains the output formatting logic.
- **middlewares**: This folder contains middlewares that handle the common logic before the controllers.
- **error**: This folder contains the error handling logic.

### infrastructure:

This folder contains the technology-specific implementations of the interfaces defined in the Core layer.

- **data**: This folder contains the data access logic, such as database connection and repository classes.
- **logging**: This folder contains the logging logic, such as loggers classes.
- **config**: This folder contains the environment variables and configuration files.

### index.ts, server.ts, app.ts and routes.ts:

These files contain the bootstraping and configuration of the application.
