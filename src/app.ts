import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import cors from '@fastify/cors';
import { PathLike } from 'node:fs';
import { JsonFileStore } from './utils/json-file-store';
import { Pet } from './business/pet-type';
import { PetService } from './business/pet-service';



export default async function createApp(options = {}, dataFilePath: PathLike) {
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>()
  await app.register(cors, {});

  const petStore = new JsonFileStore<Pet>(dataFilePath);
  const petService = new PetService(petStore);

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
      // read the http REQUEST parameters
      const { name } = request.body

      // Do the business logic
      const newPet = await petService.born(name);

      // HTTP RESPONSE
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