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

Next migration step: move the deployed Worker source here and connect Cloudflare deployment to the repository so future changes are versioned.
