# Spline

A self-hostable productivity tool to link all your apps into one interface.

## Prerequisites

You need:

- [Node.js v24 LTS](https://nodejs.org)
- corepack (included in Node.js until v25)
- a configured PostgreSQL database
- basic knowledge of the terminal

> [!IMPORTANT]
> We highly recommend to use the versions shown above (Node.js v24). Bug reports using other versions will be refused.

## Getting Started

Your only way to installing is from source, so:

```bash
# Clone the repo
git clone https://github.com/getspline/spline.git

# cd into the repo
cd spline

# Enable corepack to use pnpm
corepack enable

# Copy the example env file
cp .env.example .env

# Fill with your environment variables

# Install dependencies
pnpm install

# Start the server in dev mode (since build + start isn't ready yet)
pnpm dev
```

## Contributing

For information on how to contribute, please check [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

This project uses the AGPL-3.0. For more information, see [LICENSE](./LICENSE).
