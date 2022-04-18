# NEXT.JS Demo App

This is a [Next.js] project bootstrapped with [create-next-app] and has been added with [Redux Saga]

## Development

1. First, run the development server.

```bash
yarn install
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Production
1. Build and run on production server.

```bash
yarn build && yarn start
```

## Export to Static App
1. Build and export.

```bash
yarn build && yarn export
```

## dockerize

1. create the container for the app
```sh
docker build . -t demo-web-server
```

2. run the container and publish. 
```sh
docker run -p 4001:80 demo-web-server
```

-  `Note: publish or -p will creates a firewall rule which maps a container port to a port on the Docker host`

[Next.js]: <https://nextjs.org/>
[create-next-app]: <https://github.com/vercel/next.js/tree/canary/packages/create-next-app>
[Redux Saga]: <https://redux-saga.js.org/>
