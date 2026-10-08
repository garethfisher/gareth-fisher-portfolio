// Minimal GitHub OAuth proxy for Decap CMS's "github" backend.
// Implements the two endpoints Decap expects: /auth and /callback.
//
// Required Worker secrets (set via `wrangler secret put <name>` or the
// Cloudflare dashboard under Settings -> Variables and Secrets):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
//
// The GitHub OAuth App's "Authorization callback URL" must be set to
// exactly: https://<your-worker-subdomain>.workers.dev/callback

function randomState() {
  return crypto.randomUUID();
}

function htmlResponse(body) {
  return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') || 'github';
  if (provider !== 'github') {
    return new Response('Unsupported provider', { status: 400 });
  }

  const state = randomState();
  const redirectUri = `${url.origin}/callback`;

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  const headers = new Headers({ Location: authorizeUrl.toString() });
  headers.append(
    'Set-Cookie',
    `oauth_state=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`
  );

  return new Response(null, { status: 302, headers });
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? match[1] : null;
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expectedState = getCookie(request, 'oauth_state');

  if (!code || !state || !expectedState || state !== expectedState) {
    return htmlResponse(renderResultPage('error', 'Invalid or missing OAuth state.'));
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return htmlResponse(
      renderResultPage('error', tokenData.error_description || 'Failed to obtain access token.')
    );
  }

  return htmlResponse(renderResultPage('success', null, tokenData.access_token));
}

function renderResultPage(status, errorMessage, token) {
  const payload =
    status === 'success'
      ? JSON.stringify({ token, provider: 'github' })
      : JSON.stringify({ message: errorMessage || 'Authentication failed' });

  return `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:${status}:${payload}',
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      return handleAuth(request, env);
    }
    if (url.pathname === '/callback') {
      return handleCallback(request, env);
    }

    return new Response('Not found', { status: 404 });
  },
};
