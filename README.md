<p align="center">User Service</p>
<p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Environment Setup

1. Copy the `.env.sample` file to `.env`:

```bash
$ cp .env.sample .env
```

2. Fill in the necessary environment variables in the `.env` file.

3. Run the following Prisma commands to set up the database:

```bash
# Deploy database migrations
$ npx prisma migrate deploy

# Initialize Prisma client
$ npx prisma generate
```

## Running the App

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Documentation

After starting the application, you can access the API documentation at `/api`.

## Testing

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Kubernetes Deployment for Local Environment

To deploy the application locally and view Prometheus and Grafana, follow these steps:

1. Install [Minikube](https://minikube.sigs.k8s.io/docs/) and [Helm](https://helm.sh/docs/intro/install/).

2. Navigate to the Kubernetes configuration directory:

```bash
$ cd k8s/user-service
```

3. Run the following command to install the `user-service` Helm chart:

```bash
$ helm install user-service .
```

4. To view grafana dashboard, run the following command:

```bash
  $ minikube service user-service-grafana
```

5. To login to grafana dashboard use the credentials:
   `username: admin` and `password: C64KVgSMnbIv3EbaJqDVKKj9FxVGfVvTjqrdDvxf`

## Support

Nest is an MIT-licensed open-source project. It can grow thanks to the sponsors and support of the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
