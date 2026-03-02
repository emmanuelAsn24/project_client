import TodoListItem from "./TodoListItem";
import { p } from "./theme";

const TodoList = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2.5rem 0", color: p.muted }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌿</div>
        <div style={{ fontWeight: 600, fontSize: "1rem", color: p.text }}>Aucune tâche ici</div>
        <div style={{ fontSize: "0.82rem", marginTop: "0.3rem" }}>
          Ajoutez-en une via le champ ci-dessus !
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
      {/* En-tête liste */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "0.25rem",
      }}>
        <span style={{ fontSize: "0.75rem", color: p.muted, fontWeight: 600 }}>
          {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
        </span>
        <span style={{ fontSize: "0.7rem", color: p.mutedLight }}>
          Survolez pour modifier ou supprimer
        </span>
      </div>

      {tasks.map((todo, index) => (
        <div
          key={todo._id || index}
          style={{
            animation: `fadeInUp 0.3s ease ${index * 0.04}s both`,
          }}
        >
          <TodoListItem todo={todo} />
        </div>
      ))}

      {/* Animation CSS injectée une fois */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default TodoList;