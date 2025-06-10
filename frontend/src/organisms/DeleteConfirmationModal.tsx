// components/organisms/DeleteConfirmationModal.tsx

type DeleteConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmationModal({ onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
  <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md mx-4 text-center">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmer la suppression</h3>
    <p className="text-gray-600 mb-6">
      Es-tu sûr(e) de vouloir supprimer ce point d’intérêt ? Cette action est irréversible.
    </p>
    <div className="flex justify-center gap-4">
      <button onClick={onCancel} className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
        Annuler
      </button>
      <button onClick={onConfirm} className="cursor-pointer px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
        Supprimer
      </button>
    </div>
  </div>
</div>

  );
}
