// Lightweight fetch wrapper used across the frontend
// - prefixes requests with `/api` when needed
// - includes `credentials: 'include'` by default
// - parses JSON safely and throws a normalized Error on non-2xx

async function request(path, options = {}) {
  const normalizedPath = path.startsWith("/api") ? path : `/api${path.startsWith("/") ? "" : "/"}${path}`;
  const { body, formData, headers = {}, method = "GET", ...rest } = options;

  const init = {
    method,
    credentials: "include",
    ...rest,
  };

  if (formData) {
    init.body = formData;
    // don't set content-type for FormData — browser sets the multipart boundary
  } else if (body !== undefined) {
    init.headers = { "Content-Type": "application/json", ...headers };
    init.body = JSON.stringify(body);
  } else if (Object.keys(headers).length) {
    init.headers = { ...headers };
  }

  const res = await fetch(normalizedPath, init);

  const text = await res.text().catch(() => "");
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const err = new Error((data && (data.error || data.message)) || res.statusText || "Request failed");
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

export default {
  request,
  get: (path, opts) => request(path, { method: "GET", ...opts }),
  post: (path, body, opts) => request(path, { method: "POST", body, ...opts }),
  put: (path, body, opts) => request(path, { method: "PUT", body, ...opts }),
  patch: (path, body, opts) => request(path, { method: "PATCH", body, ...opts }),
  del: (path, opts) => request(path, { method: "DELETE", ...opts }),
  postForm: (path, formData, opts) => request(path, { method: "POST", formData, ...opts }),
};
