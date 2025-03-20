import { useState } from 'react';
import './styles/index.css';  // Ensure your styles are included

// Example list of HardTimes prompts (in an array)
const hardTimesPrompts = [
  { id: 1, category: 'Grief', prompt: 'How to cope with the loss of a loved one' },
  { id: 2, category: 'Workplace', prompt: 'How to handle a difficult coworker' },
  { id: 3, category: 'Apologies', prompt: 'How to apologize for being late to a meeting' },
];

// Simple Prompt component that receives data via props
const Prompt = ({ category, prompt }) => {
  return (
    <div className="item">
      <h3>{category}</h3>
      <p>{prompt}</p>
    </div>
  );
};

function App() {
  return (
    <>
      <h1>HardTimes Prompts</h1>
      
      {/* Mapping over the hardTimesPrompts array and passing data as props */}
      <div>
        {hardTimesPrompts.map((prompt) => (
          <Prompt
            key={prompt.id}
            category={prompt.category}
            prompt={prompt.prompt}
          />
        ))}
      </div>
    </>
  );
}

export default App;
