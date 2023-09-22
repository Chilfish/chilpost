### Chill Post App

Build with Nuxt3

### Features

- **Error handling**: I'am trying to handle the errors unitedly at [errorHandler.ts](./server/error/newError.ts). So that it's unnecessary to try-catch everywhere, nitro will catch it. But I am not sure if it is a good practice.

- **Authentication**: I am using **[jws]** for authentication. That's signatured jwt. The public key and private key are stored in the environment variable. The public key is used to verify the token, and the private key is used to sign the token. The token is stored in the cookie.

### Start

```bash
pnpm i

pnpm dev
```

### Build

In production mode, you need to set the environment variables in Vercel, see `.env.example` for reference. (at `https://vercel.com/${your_name}/todo-ender/settings/environment-variables`).

Note that, you should generate the `PUBLIC_KEY` and `PRIVATE_KEY` by yourself (You can generate them at https://jwt.rocks/).
