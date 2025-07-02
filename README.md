# drizzle-studio-docker

This is a docker image for drizzle studio deployment.

It's a prototype and only works for postgres for now.
You can easily replace the postgres related dependencies with other DB like mysql.

```bash
docker build -t drizzle-studio-docker .
docker run --rm -p 4983:4983 -e DATABASE_URL=postgres://xxxxxx drizzle-studio-docker
```

If you want to replace `drizzle.config.ts` with a custom one, (e.g. maybe you want to trust AWS's certificate)
you can use volume to replace it.

## Cloudflare Tunnel

In case your DB is in a private VPC and not publicly accessible.
You can use Cloudflare Tunnel to expose the drizzle studio to public web, with Cloudflare authentication protection.

In Cloudflare Tunnel's settings, add public hostname, service should be `https://local.drizzle.studio?host=0.0.0.0`.
Under **Additional application settings / HTTP Settings**, set **HTTP Host Header** to `local.drizzle.studio`.
