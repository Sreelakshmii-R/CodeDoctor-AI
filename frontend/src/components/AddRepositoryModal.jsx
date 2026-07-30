import { useState } from "react";

const API_URL = "http://localhost:8000";

function AddRepositoryModal({ onClose, onAdded }) {

  const [formData, setFormData] = useState({
    name: "",
    github_url: "",
    language: ""
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/repositories/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );


      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to add repository");
      }


      await response.json();

      alert("Repository added successfully!");

      onAdded();
      onClose();


    } catch(error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          p-8
          w-[420px]
          shadow-xl
        "
      >

        <h2 className="text-2xl font-semibold mb-6">
          Add Repository
        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">


          <input
            name="name"
            placeholder="Repository name"
            value={formData.name}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
            required
          />


          <input
            name="github_url"
            placeholder="GitHub URL"
            value={formData.github_url}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
            required
          />


          <input
            name="language"
            placeholder="Programming language"
            value={formData.language}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />


          <div className="flex justify-end gap-3 pt-4">


            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                rounded-lg
                border
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                px-5
                py-2
                rounded-lg
                bg-[#0F766E]
                text-white
              "
            >
              {loading ? "Adding..." : "Add Repository"}
            </button>


          </div>


        </form>


      </div>


    </div>

  );
}


export default AddRepositoryModal;