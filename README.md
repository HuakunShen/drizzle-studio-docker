# drizzle-studio-docker

This is a docker image for drizzle studio deployment.

It's a prototype and only works for postgres for now.
You can easily replace the postgres related dependencies with other DB like mysql.

## Using Pre-built Image from GitHub Container Registry

```bash
docker run --rm -p 4983:4983 \
  -e DATABASE_URL=postgres://xxxxxx \
  -e SSL_REJECT_UNAUTHORIZED=false \    # disable self-signed certificate check (optional: default to true)
  ghcr.io/huakunshen/drizzle-studio-docker:latest
```

## Building Locally

```bash
docker build -t drizzle-studio-docker .
docker run --rm -p 4983:4983 \
  -e DATABASE_URL=postgres://xxxxxx \
  -e SSL_REJECT_UNAUTHORIZED=false \
  drizzle-studio-docker
```

If you want to access a DB on localhost, you may have to enable `--network=host`.

If you want to replace `drizzle.config.ts` with a custom one, (e.g. maybe you want to trust AWS's certificate)
you can use volume to replace it.

## Cloudflare Tunnel

In case your DB is in a private VPC and not publicly accessible.
You can use Cloudflare Tunnel to expose the drizzle studio to public web, with Cloudflare authentication protection.

In Cloudflare Tunnel's settings, add public hostname, the service should be `http://localhost:4983`.

To access the website, go to `https://local.drizzle.studio/?host=<your domain>&port=443`.

However, this way, you cannot enable cloudflare access auth protection. Otherwise the data cannot be loaded. 

Overall, it's not a good idea to expose the data to public internet unless it's a demo or non important data.

## Publishing

### Automatic Publishing (GitHub Actions)
The image is automatically built and published to GitHub Container Registry when you:
- Push to the `main` branch
- Create a version tag (e.g., `v1.0.0`)

### Manual Publishing to Docker Hub
```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag huakunshen/drizzle-studio-docker:latest \
  --tag huakunshen/drizzle-studio-docker:$(date +%Y%m%d) \
  --push .
```

## Self-Signed Certificate

If you are using AWS RDS or some other DB services that use self-signed certificate, you may want to set
`SSL_REJECT_UNAUTHORIZED` environment variable to `false`.
