"use client";
import { useEffect, useRef, useState } from "react";

type ActionMenuProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStop?: () => void;
};

const ActionMenu = ({ onView, onEdit, onDelete, onStop }: ActionMenuProps) => {
  const [editMode, setEditMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleEditMode = () => setEditMode(!editMode);

  useEffect(() => {
    // Fonction pour gérer les clics en dehors du composant
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setEditMode(false); // Fermer le menu si le clic est en dehors
      }
    };
    // Ajouter un écouteur d'événement pour les clics
    document.addEventListener("click", handleClickOutside);
    // Supprimer l'écouteur d'événement lors du démontage
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const buttonClasses =
    "group flex-1 transition-colors duration-200 text-white/90";
  const iconClasses =
    "transform transition-transform duration-200 group-hover:scale-110";

  return (
    <div className="flex" ref={menuRef}>
      {/* Bouton pour basculer le mode d'édition */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleEditMode();
        }}
        className="w-10 cursor-pointer text-gray-500 hover:text-gray-900"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      {/* Section des boutons d'action */}
      <section
        className={`flex h-full flex-row-reverse overflow-hidden ${
          editMode ? "w-36" : "w-0"
        } ease transition-all duration-500`}
      >
        {onView && (
          <button
            onClick={onView}
            className={`bg-blue-500 hover:bg-blue-600 ${buttonClasses}`}
          >
            <i className={`fa-solid fa-eye ${iconClasses}`}></i>
            <p className="text-xs">Voir</p>
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className={`bg-green-500 hover:bg-green-600 ${buttonClasses}`}
          >
            <i className={`fa-solid fa-edit ${iconClasses}`}></i>
            <p className="text-xs">Éditer</p>
          </button>
        )}

        {onStop && (
          <button
            onClick={onStop}
            className={`bg-slate-500 hover:bg-slate-600 ${buttonClasses}`}
          >
            <i className={`fa-solid fa-stop ${iconClasses}`}></i>
            <p className="text-xs">Stop</p>
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className={`bg-red-500 hover:bg-red-600 ${buttonClasses}`}
          >
            <i className={`fa-solid fa-trash-can ${iconClasses}`}></i>
            <p className="text-xs">Suppr.</p>
          </button>
        )}
      </section>
    </div>
  );
};

export default ActionMenu;
