type ActionButtonProps = {
  label: string; // Texte du bouton
  icon: string; // Icone du bouton
  color: string; // Couleur du bouton (class CSS || tailwindcss)
  onClick: () => void; // Fonction à exécuter au clic
};

const ActionButton = ({ label, icon, color, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group flex-1 text-white/90 transition-colors duration-300 ${color}`}
    >
      <i
        className={`${icon} transform transition-transform duration-200 group-hover:scale-110`}
      ></i>
      <p className="text-xs">{label}</p>
    </button>
  );
};

export default ActionButton;
