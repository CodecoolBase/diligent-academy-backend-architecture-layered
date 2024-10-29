import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import cors from '@fastify/cors';

function getNextId<T extends {id: number}>(items: T[]) {
  if (items.length === 0) {
    return 1;
  }
  const ids = items.map(item => item.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

function createStore<T>() {
  let store: T[] = [];
  return {
    read: async () => structuredClone(store),
    write: async (data: T[]) => store = structuredClone(data)
  }
}

type Pet = {
  id: number,
  name: string
  food: number,
  weight: number
  age: number,
}

export default async function createApp(options = {}) {
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>()
  await app.register(cors, {});

  const petStore = createStore<Pet>();

  const postPetSchema = {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
      additionalProperties: false
    }
  } as const
  app.post(
    '/pets',
    { schema: postPetSchema },
    async (request, reply) => {
      const { name } = request.body

      const pets = await petStore.read();
      const nextId = getNextId(pets);
      const newPet: Pet = {
        id: nextId,
        name,
        food: 1,
        weight: 1,
        age: 1
      }
      pets.push(newPet);
      await petStore.write(pets);

      reply.status(201);
      return newPet;
    }
  )

  app.get(
    '/pets',
    async () => {
      const pets = await petStore.read();
      return pets;
    }
  )

  return app;
}