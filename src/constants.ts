import { User } from "types";

export enum StatusCode {
  BadRequest = 400,
  ClientErrorNotFound = 404,
  ServerErrorInternal = 500,
  SuccessOK = 200,
  SuccessCreated = 201,
  NoContent = 204,
}

export enum HTTPMethod {
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export const users: User[] = [
  {
    id: "b8d32d98-f671-4aaf-b93e-78604643ae28",
    username: "Bret",
    age: 28,
    hobbies: ["reading", "music"],
  },
  {
    id: "7cc7e48a-ff10-47ca-b843-191ab50f93f5",
    username: "Antonette",
    age: 20,
    hobbies: ["gaming", "photography"],
  },
  {
    id: "f0824f25-7b91-4342-91a3-f390d5554807",
    username: "Samantha",
    age: 55,
    hobbies: ["cooking", "hiking"],
  },
  {
    id: "65ab4300-8740-49fd-bc3a-426fa6b09d74",
    username: "Karianne",
    age: 28,
    hobbies: ["writing", "traveling"],
  },
  {
    id: "ad6a843a-3794-472a-a40d-66dc2f1a9777",
    username: "Kamren",
    age: 16,
    hobbies: ["skateboarding", "drawing"],
  },
  {
    id: "5a06cfd2-1a22-4872-8078-3e5a650b4d62",
    username: "Leopoldo_Corkery",
    age: 43,
    hobbies: ["fishing", "woodworking"],
  },
  {
    id: "52c99e76-bdfb-4113-afa3-a0fe45974264",
    username: "Elwyn.Skiles",
    age: 18,
    hobbies: ["coding", "esports"],
  },
  {
    id: "8815cc0f-f42c-46f3-9aec-6e393b6ebc5b",
    username: "Maxime_Nienow",
    age: 31,
    hobbies: ["fishing", "drawing"],
  },
  {
    id: "cba34427-742c-49a8-94c5-970499db6a9e",
    username: "Delphine",
    age: 22,
    hobbies: ["skateboarding", "drawing"],
  },
  {
    id: "23eca2c1-0659-4c8a-99d8-c618dd9d18b2",
    username: "Moriah.Stanton",
    age: 50,
    hobbies: ["writing", "traveling"],
  },
];
