import { useEffect, useState } from "react";
import { getRepositories } from "../api/repositories";

function RepositoryTable() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const data = await getRepositories();
        setRepositories(data);
      } catch (error) {
        console.error("Failed to load repositories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRepositories();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Repository Overview
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="pb-3">Repository</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Language</th>
            <th className="pb-3 text-right">GitHub</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="4"
                className="py-8 text-center text-slate-500"
              >
                Loading repositories...
              </td>
            </tr>
          ) : repositories.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="py-8 text-center text-slate-500"
              >
                No repositories found.
              </td>
            </tr>
          ) : (
            repositories.map((repo) => (
              <tr
                key={repo.id}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="py-5 font-medium">
                  {repo.name}
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                    Healthy
                  </span>
                </td>

                <td className="text-slate-600">
                  {repo.language}
                </td>

                <td className="text-right">
                  <a
                    href={repo.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F766E] hover:underline font-medium"
                  >
                    View →
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RepositoryTable;