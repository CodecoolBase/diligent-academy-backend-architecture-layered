import createApp from "./app";

const PORT = 4400;

const options = {
  logger: {
    level: 'debug', 
    transport: {target: 'pino-pretty'}
  }
};

const app = createApp(options);

app.listen({port: PORT}, (error, address) => {
  if(error) {
    app.log.error(error);
    process.exit(1);
  }
  app.log.info(`Server is started successfully.`)
});