import { useState } from 'react';
import './styles/index.css';  // Ensure your styles are included

function App() {
  const [prompts, setPrompts] = useState([]); // No initial prompts
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Add a new prompt
  const addPrompt = () => {
    if (!category || !prompt) return;
    const newPrompt = { id: Date.now(), category, prompt };
    setPrompts([...prompts, newPrompt]);
    clearForm();
  };
   // Start editing
   const startEditing = (id) => {
    const promptToEdit = prompts.find((p) => p.id === id);
    setCategory(promptToEdit.category);
    setPrompt(promptToEdit.prompt);
    setEditingId(id);
  };

  // Save edit
  const saveEdit = () => {
    setPrompts(prompts.map((p) =>
      p.id === editingId ? { ...p, category, prompt } : p
    ));
    setEditingId(null);
    clearForm();
  };

  // Delete prompt
  const deletePrompt = (id) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  // Clear input fields
  const clearForm = () => {
    setCategory('');
    setPrompt('');
  };

  return (
    <div className="container">
      {/* Form Section */}
      <div className="form-section">
        <h1>HardTimes Prompts</h1>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {editingId ? (
          <button onClick={saveEdit}>Save Edit</button>
        ) : (
          <button onClick={addPrompt}>Create</button>
        )}
      </div>

      {/* Table Section */}
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Prompt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.length === 0 ? (
              <tr>
                <td colSpan="3">No prompts available. Add one!</td>
              </tr>
            ) : (
              prompts.map((p) => (
                <tr key={p.id}>
                  <td>{p.category}</td>
                  <td>{p.prompt}</td>
                  <td>
                    <button onClick={() => startEditing(p.id)}>Edit</button>
                    <button onClick={() => deletePrompt(p.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;

