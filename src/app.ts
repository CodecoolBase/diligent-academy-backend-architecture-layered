import fastify from 'fastify';

export default function createApp(options = {}) {
  const app = fastify(options)

  app.get('/hello', async () => {
    return { hello: 'World!' }
  })

  return app;
}