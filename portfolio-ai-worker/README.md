# Portfolio AI Worker

Cloudflare Worker source for Mehmet Cam's portfolio assistant.

## Target architecture

Knowledge-first routing:
1. Deterministic answers for common portfolio questions.
2. Retrieval of relevant portfolio context.
3. OpenRouter only when synthesis is actually needed.
4. Short timeout and graceful fallback.

This avoids sending simple questions to slow reasoning models.

## Deployment

The production Worker currently lives in Cloudflare. Keep `OPENROUTER_API_KEY` as a Cloudflare secret and never commit it.

Cloudflare Builds is connected to this repository. Production deploys use the `main` branch with `/portfolio-ai-worker` as the project path.


## Persistent unanswered-question queue

The Worker already supports unanswered-question logging. For persistence, configure these Cloudflare bindings once:

- KV binding name: `UNANSWERED_KV`
- Secret: `ADMIN_TOKEN` (random long value; never commit it)

After the KV binding exists, unanswered questions are stored for 30 days.
The authenticated endpoint `GET /admin/unanswered?limit=50` returns the most recent items when called with:

`Authorization: Bearer <ADMIN_TOKEN>`

The public `/health` response exposes only whether persistence is configured, never the secret or stored questions.
