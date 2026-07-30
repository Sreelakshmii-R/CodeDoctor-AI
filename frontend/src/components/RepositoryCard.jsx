import { analyzeRepository } from "../api/analysis";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteRepository } from "../api/repositories";

function RepositoryCard({ repo }) {

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
  try {
    setLoading(true);

    const result = await analyzeRepository(repo.id);

    console.log(result);

    alert("Repository analyzed successfully!");

  } catch (error) {
    console.error(error);

    alert(error.message);

  } finally {
    setLoading(false);
  }
}


  async function handleDelete() {

  const confirmDelete = window.confirm(
    `Delete ${repo.name}?`
  );

  if (!confirmDelete) return;

  try {

    await deleteRepository(repo.id);

    alert("Repository deleted.");

    window.location.reload();

  } catch (error) {

    alert(error.message);

  }

}
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition
      "
    >
      <div className="flex justify-between items-start">

        {/* Repository Info */}
        <div className="flex gap-4">

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-[#0F766E]
              text-white
              flex
              items-center
              justify-center
              font-bold
              text-lg
            "
          >
            {repo.name.charAt(0).toUpperCase()}
          </div>


          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {repo.name}
            </h2>

            <p className="text-slate-500 mt-1">
              {repo.language || "Unknown language"}
            </p>

            <p className="text-sm text-slate-400 mt-2">
              GitHub Repository
            </p>
          </div>

        </div>


       

      </div>


      {/* Footer */}
      <div
        className="
          mt-6
          pt-4
          border-t
          border-slate-100
          flex
          justify-between
          items-center
        "
      >

        <div>
          <p className="text-sm text-slate-400">
            Last Analysis
          </p>

          <p className="text-sm font-medium text-slate-700">
            Recently
          </p>
        </div>


        <div className="flex gap-3">

          <Link

            to={`/repositories/${repo.id}`}

            className="
            px-4
            py-2
            rounded-lg
            border
            border-slate-200
            text-slate-700
            hover:bg-slate-50
            "

            >
            View Details
            </Link>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
              px-4
              py-2
              rounded-lg
              bg-[#0F766E]
              text-white
              hover:bg-[#115E59]
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? "Analyzing..." : "Re-analyze"}
          </button>

            <button
  onClick={handleDelete}
  className="
    px-4
    py-2
    rounded-lg
    bg-red-600
    text-white
    hover:bg-red-700
    transition
  "
>
  Delete
</button>

        </div>

      </div>

    </div>
  );
}

export default RepositoryCard;