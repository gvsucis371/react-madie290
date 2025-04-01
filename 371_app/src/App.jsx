import { useState, useEffect } from 'react';
import './styles/index.css';  // Ensure your styles are included

function App() {
  const [prompts, setPrompts] = useState([]); // No initial prompts
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch prompts from API
  const fetchPrompts = async () => {
    const response = await fetch('http://localhost:5000/prompts');
    const data = await response.json();
    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // Add a new prompt
  const addPrompt = async () => {
    if (!category || !prompt) return;
    const newPrompt = { category, prompt };

    const response = await fetch('http://localhost:5000/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPrompt),
    });

    if (response.ok) {
      fetchPrompts();
      clearForm();
    }
  };

  // Start editing
  const startEditing = (id) => {
    const promptToEdit = prompts.find((p) => p.id === id);
    setCategory(promptToEdit.category);
    setPrompt(promptToEdit.prompt);
    setEditingId(id);
  };

  // Save edit
  const saveEdit = async () => {
    const updatedPrompt = { category, prompt };

    const response = await fetch(`http://localhost:5000/prompts/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrompt),
    });

    if (response.ok) {
      fetchPrompts();
      setEditingId(null);
      clearForm();
    }
  };

  // Delete prompt
  const deletePrompt = async (id) => {
    if (id === editingId) {
      // Prevent deletion if editing this prompt
      alert("Cannot delete the prompt while editing.");
      return;
    }
    const response = await fetch(`http://localhost:5000/prompts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchPrompts();
    }
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
