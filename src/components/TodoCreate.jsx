import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, setSatusToIdle } from "../redux/slices/taskSlice";
import { getState } from "../redux/slices/authSlice";

const TodoCreate = () => {
  const [desc, setDesc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    connectedUser: { _id },
  } = useSelector(getState);
  const dispatch = useDispatch();

  const handleCreateTodo = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const titre = desc.trim();

    // Validation
    if (!titre) {
      setErrorMsg("Task description cannot be empty!");
      return;
    }

    if (!_id) {
      setErrorMsg("User not authenticated. Please login again.");
      console.error("Error: No user ID found", { _id });
      return;
    }

    setDesc("");
    console.log("Creating task with:", { description: titre, owner: _id });
    dispatch(createTask({ description: titre, owner: _id }))
      .then(() => console.log("Task created successfully"))
      .catch((err) => {
        console.error("Error creating task:", err);
        setErrorMsg("Failed to create task. Check console for details.");
      });

    // Auto clear status after 5 seconds
    setTimeout(() => {
      dispatch(setSatusToIdle());
    }, 5000);
  };

  return (
    <div>
      <form
        onSubmit={handleCreateTodo}
        className="mt-7 flex items-center gap-4 overflow-hidden rounded-md p-4 glass-card content-wrap"
      >
        <span className="inline-block h-5 w-5 rounded-full border-2 transition-all duration-700 dark:border-slate-600"></span>
        <input
          type="text"
          className="w-full text-gray-500 outline-none transition-all duration-700 placeholder:text-gray-400 bg-transparent"
          placeholder="Create a new task..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
       
      </form>
        <input
          type="text"
          className="w-full text-gray-500 outline-none transition-all duration-700 placeholder:text-gray-400 bg-transparent"
          placeholder="Create a new task..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
       
      {errorMsg && (
        <div className="mt-2 p-3 rounded-md bg-red-100 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default TodoCreate;
