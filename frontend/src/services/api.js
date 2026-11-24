/**
 * Tiny fetch wrapper. Every request to the backend goes through here, so the
 * token header, JSON handling and error shape live in exactly one place.
 */
const TOKEN_KEY = 'memorylane.token'

export const tokenStore = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } },
  set: (t) => { try { localStorage.setItem(TOKEN_KEY, t) } catch { /* storage unavailable */ } },
  clear: () => { try { localStorage.removeItem(TOKEN_KEY) } catch { /* storage unavailable */ } },
}

export class ApiError extends Error {
  constructor(message, status, fieldErrors = {}) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

let onUnauthorized = () => {}
/** AuthContext registers a callback here so an expired token logs the user out everywhere. */
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn }

// Turn FastAPI's validation errors into { fieldName: "message" } and a readable summary.
function parseError(status, data) {
  const detail = data?.detail
  if (Array.isArray(detail)) {
    const fieldErrors = {}
    for (const d of detail) {
      const field = d.loc?.[d.loc.length - 1]
      if (typeof field === 'string' && !fieldErrors[field]) fieldErrors[field] = d.msg.replace(/^Value error, /, '')
    }
    return new ApiError('Please check the highlighted fields.', status, fieldErrors)
  }
  if (typeof detail === 'string') return new ApiError(detail, status)
  return new ApiError('Something went wrong. Please try again.', status)
}

export async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const token = tokenStore.get()
  if (auth && token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`/api${path}`, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined })
  } catch {
    throw new ApiError("Can't reach the server. Check your connection and try again.", 0)
  }

  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    if (res.status === 401 && auth && token) onUnauthorized()
    throw parseError(res.status, data)
  }
  return data
}
