import React from "react";
import Modal from "../common/modal"; // ton modal réutilisable

export default function PostesConfirmation({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null; // Ne rien afficher si modal fermée

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmation" size="md">
      <p>Voulez-vous vraiment changer le statut de ce poste ?</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
}
