import { useState } from "react";

export default function EditPointModal({ point, onClose, onSave }) {
  const [name, setName] = useState(point.name);
  const [description, setDescription] = useState(point.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...point, name, description });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay gris semi-transparent - z-40 pour être sous la modale */}
      <div
        className="absolute inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Modale - z-50 pour passer au-dessus de l’overlay */}
      <div className="relative bg-white p-6 rounded-xl w-11/12 max-w-lg shadow-xl z-50">
        <h2 className="text-xl font-bold mb-4 text-center">Modifier le point</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nom</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
