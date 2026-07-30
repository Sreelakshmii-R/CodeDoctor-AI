const API_URL = import.meta.env.VITE_API_URL;

export async function getRepositories() {
  const response = await fetch(`${API_URL}/repositories/`);

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}
export async function createRepository(data) {
  const response = await fetch(`${API_URL}/repositories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  return response.json();
}

export async function deleteRepository(id) {
  const response = await fetch(
    `${API_URL}/repositories/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete repository");
  }

  return response.json();
}