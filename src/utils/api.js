export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  // Auto logout if token invalid
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }

  return response;
};
