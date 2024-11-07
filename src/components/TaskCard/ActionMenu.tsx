"use client";
import { useTaskHandlers } from "@/hooks/swr/useTaskHandlers";
import { TaskType } from "@/types/task";
import { useEffect, useRef, useState } from "react";
import { KeyedMutator } from "swr";
import ActionButton from "./ActionButton";

type ActionMenuProps = {
  mutate: KeyedMutator<TaskType[]>;
  taskID?: string;
  isCompleted: boolean;
};

const ActionMenu = ({ taskID, mutate, isCompleted }: ActionMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!editMode);

  // Fonction pour fermer le menu lors d'un clic en dehors
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

  // Fonction pour supprimer une tâche
  const { handleDeleteTask } = useTaskHandlers(mutate);
  const onDelete = async () => {
    try {
      await handleDeleteTask(taskID!);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <section className="flex" ref={menuRef}>
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
      <div
        className={`flex h-full flex-row overflow-hidden ${editMode ? "w-36" : "w-0"} ease transition-all duration-500`}
      >
        {/* Bouton commun */}
        <ActionButton
          label="Suppr."
          icon="fa-solid fa-trash-can"
          color="bg-red-500 hover:bg-red-600"
          onClick={onDelete}
        />

        {/* Boutons si la tâche est terminée */}
        {isCompleted && (
          <>
            <ActionButton
              label="Éditer"
              icon="fa-solid fa-edit"
              color="bg-green-500 hover:bg-green-600"
              onClick={() => console.log("onEdit")}
            />
            <ActionButton
              label="Voir"
              icon="fa-solid fa-eye"
              color="bg-blue-500 hover:bg-blue-600"
              onClick={() => console.log("onView")}
            />
          </>
        )}

        {/* Boutons si la tâche est en cours */}
        {!isCompleted && (
          <ActionButton
            label="Stop"
            icon="fa-solid fa-stop"
            color="bg-slate-500 hover:bg-slate-600"
            onClick={() => console.log("onStop")}
          />
        )}
      </div>
    </section>
  );
};

export default ActionMenu;
