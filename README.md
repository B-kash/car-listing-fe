## Installation

- Run `yarn` to install all dependencies
- copy .env.example to .env `cp .env.example .env`
- Set all the env variables correctly. There are some default values there. It assumes the server is running on `http://localhost:4000`
- Run `yarn dev` to run development environemnt.

If you make changes in the server, run `yarn generate` to generate graphql types. The types will be generated in \_\_generated directory

## Furthermore

- we could add sentry to to collect erros and notify the team about the errors
