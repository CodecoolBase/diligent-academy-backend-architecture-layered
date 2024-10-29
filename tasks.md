# Tasks

Use the [api.md](./api.md) to document your solution.

## Use case

- We to create an API for a movie database.
- We want to store the movie's title, genres, plot, release date and of course the actors.
- In our api we want to list the actors for the given movie.
- We want to list a specific actor's movies too.
- The information we want to store for an actor: name, the born date, the born location and their height.
- When we are listing a movie, it is enough to show the title and the release data.
- When we are listing an actor, it is enough to show their name and height.
- Each movie and actor has a unique numeric ID.
- We also want to add, remove and edit movies and actors individually.
- We want to make partial update on the movies and the actors.
- We want to assign an actor to a movie and also remove an actor from a movie.
- We also want to search for the movie by title and genre.
- We want to search for the actors by name.

### Background materials

- [How to design a REST API?](https://restfulapi.net/rest-api-design-tutorial-with-example/)
- [HTTP methods](https://restfulapi.net/http-methods/)
- [Resource naming](https://restfulapi.net/resource-naming/)

## 1: Identify the resources of this API

- List the resources without details in the `api.md`.

## 2: Plan the URIs for the resources

- Based on the use case description above plan the URIs for the single resource.
- Plan the URIs for the collection resource.
- Plan the URIs for the sub-collections (e.g. the list of actors for a movie) for 
the collections and single resources.

Document your URIs in the proper part of the `api.md`.

You do not need to add now neither the HTTP methods nor the
representation.

## 3: Design representation for the resources

- Use JSON representation for this task
- Design the representations of single resources.
- Design the representations of collection resources.
- Right now we can assume that in a sub-collection a single resource
contains the same information as the single resource own their own.
- Also the collections in the sub-collections contains the same info
as the collections on their own.
- Optionally you can add hypermedia links.

Hint: You can create JSON formatted strings in an md file using
the following syntax, e.g. for a pet.

```json
{
  "name": "Fluffy",
  "age": 4,
  "breed": "Maine Coon",
  "kind": "cat"
}
```

## 4: Add HTTP methods

- Based on the use case description add the HTTP methods for the resources.
- List the HTTP method + URI describe the specific use case.
- List them for the association / dereference too.

