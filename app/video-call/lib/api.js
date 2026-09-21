const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://08z4s4jn-5000.inc1.devtunnels.ms';

async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong.');
    err.code = data.code;
    err.status = res.status;
    throw err;
  }
  return data;
}

export const videoCallApi = {
  // public
  getPublicMeeting: (meetingId) => request(`/api/video-calls/public/${meetingId}`),
  resolveLink: (link) => request('/api/video-calls/public/resolve', { method: 'POST', body: { link } }),
  joinMeeting: (meetingId, name) =>
    request(`/api/video-calls/public/${meetingId}/join`, { method: 'POST', body: { name } }),

  // admin
  createMeeting: (payload, token) => request('/api/video-calls', { method: 'POST', body: payload, token }),
  listMeetings: (params = {}, token) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/video-calls?${qs}`, { token });
  },
  getStats: (token) => request('/api/video-calls/stats', { token }),
  getMeeting: (id, token) => request(`/api/video-calls/${id}`, { token }),
  updateMeeting: (id, payload, token) => request(`/api/video-calls/${id}`, { method: 'PUT', body: payload, token }),
  deleteMeeting: (id, token) => request(`/api/video-calls/${id}`, { method: 'DELETE', token }),
  endMeeting: (id, token) => request(`/api/video-calls/${id}/end`, { method: 'POST', token }),
};