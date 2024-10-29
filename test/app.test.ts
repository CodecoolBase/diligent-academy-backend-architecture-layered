import { FastifyInstance } from "fastify";
import createApp from "../src/app"

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({logger: false});
})

it('respond to the GET /hello', async () => {
  const response = await app!
    .inject()
    .get('/hello')
  const body = JSON.parse(response.body)

  expect(response.statusCode).toStrictEqual(200);
  expect(body).toStrictEqual({hello: 'World!'})
})

afterEach(() => {
  app?.close()
})