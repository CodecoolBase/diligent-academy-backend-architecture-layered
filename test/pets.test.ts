import { FastifyInstance } from "fastify";
import createApp from "../src/app"

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: false });
})

describe('POST /pets', () => {
  it('should create a pet', async () => {
    const name = 'Fluffy'
    const expectedPet = {
      id: 1,
      name: 'Fluffy',
      age: 1,
      weight: 1,
      food: 1
    }

    const response = await app!
      .inject()
      .body({ name })
      .post('/pets')
    const body = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(201);
    expect(body).toStrictEqual(expectedPet)
  })
})

describe('GET /pets', () => {
  it('should get the pets', async () => {
    const createPetBody = { name: 'Fluffy' }
    const expectedPets = [
      { id: 1, name: 'Fluffy', age: 1, weight: 1, food: 1 }
    ]

    await app!
      .inject()
      .body(createPetBody)
      .post('/pets')
    const response = await app!
      .inject()
      .get('/pets')
    const body = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(200);
    expect(body).toStrictEqual(expectedPets)
  })
})

afterEach(() => {
  app?.close()
})