import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import AddRepositoryModal from "../components/AddRepositoryModal";
import { getRepositories } from "../api/repositories";
import RepositoryCard from "../components/RepositoryCard";

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const data = await getRepositories();
        setRepositories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRepositories();
  }, []);

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-10 py-8">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Repositories
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your analyzed codebases and run AI reviews.
          </p>

          <p className="text-sm text-slate-400 mt-2">
            {repositories.length} repositories connected
          </p>
        </div>


        {/* Analyze Button */}
        <button
            onClick={() => setShowModal(true)}
          className="
            bg-[#0F766E]
            hover:bg-[#115E59]
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            shadow-lg
            shadow-emerald-900/10
            transition
          "
        >
          <Plus size={18} />
          Add Repository
        </button>

      </div>


      {/* Search */}
      <div className="relative mt-8 mb-8">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-12
            pl-11
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            focus:outline-none
            focus:ring-2
            focus:ring-[#0F766E]
          "
        />

      </div>


      {/* Repository List */}
      <div className="space-y-5">

        {filteredRepositories.length > 0 ? (

          filteredRepositories.map((repo) => (

            <RepositoryCard
              key={repo.id}
              repo={repo}
            />

          ))

        ) : (

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              p-12
              text-center
            "
          >

            <h2 className="text-xl font-semibold text-slate-700">
              No repositories found
            </h2>

            <p className="text-slate-500 mt-2">
              Try searching with a different name.
            </p>

          </div>

        )}

      </div>

      {showModal && (
  <AddRepositoryModal
    onClose={() => setShowModal(false)}
    onAdded={getRepositories}
  />
)}

    </div>
  );
}

export default Repositories;