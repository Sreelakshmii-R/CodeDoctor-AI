const API_URL = "http://localhost:8000";


export async function analyzeRepository(repositoryId) {

  const response = await fetch(
    `${API_URL}/repositories/${repositoryId}/analyze`,
    {
      method: "POST",
    }
  );


  if (!response.ok) {

    const error = await response.json();

    throw new Error(
      error.detail || "Analysis failed"
    );

  }


  return response.json();

}