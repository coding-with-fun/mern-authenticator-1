# Project Setup

## Initial Project Setup

### Main Project Setup

Path = mern-authenticator

```bash
npm init
npm i concurrently nodemon --save-dev
```

### Server setup

Path = mern-authenticator

```bash
mkdir server && cd server
npm init
npm i bcryptjs colors cors dotenv express jsonwebtoken mongoose
```

### Client setup

Path = mern-authenticator

```bash
npx create-react-app client
cd client
npm i axios
```

***

## Set environment variables

### Server variables

Path = mern-authenticator

```bash
MONGODB_CONNECTION_STRING=<MongoDB connection string>
JWT_SECRET=<A random strong password>
```

### Client variables

Path = mern-authenticator -> client

```bash
REACT_APP_SERVER_URL=<Server URL (example = http://localhost:5000)>
```
