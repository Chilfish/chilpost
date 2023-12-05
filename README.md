### Chill Post App

An https://x.com like app, it's very simple, but it's a good practice for me to learn the nuxt3 and mysql.

Build with Nuxt3 + nodejs/MySql2 + jose/jws

> I'm looking for the mysql hosting service, so the online preview is not fully available now.

Also, I am trying to use kotlin + spring boot + exposed to build the another backend version. Kotlin is so cool!😍 It's still in development and closed source now.

### Features

- **Error handling**: I'am trying to handle the errors unitedly at [errorHandler.ts](./server/error/newError.ts). So that it's unnecessary to try-catch everywhere, nitro will catch it. But I am not sure if it is a good practice.

- **Authentication**: I am using **[jws]** for authentication. That's signatured jwt. The public key and private key are stored in the environment variable. The public key is used to verify the token, and the private key is used to sign the token. The token is stored in the cookie.

### Start

```bash
pnpm i

pnpm dev
```

then rename the `.env.example` to `.env` and fill the environment variables in it.

### Build

In production mode, you need to set the environment variables in Vercel, see `.env.example` for reference. (at `https://vercel.com/${your_name}/todo-ender/settings/environment-variables`).

Note that, you should generate the `PUBLIC_KEY` and `PRIVATE_KEY` by yourself (You can generate them at https://jwt.rocks/).

### Docker support

Now you can use docker to run the app🥳.

```bash
docker-compose up -d
```

