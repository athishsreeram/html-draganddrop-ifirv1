import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, label: 'Heading', content: '<h2>Heading</h2>' },
    { id: 2, label: 'Text Content', content: '<div><p>More text content</p></div>' },
    { id: 3, label: 'Image', content: '<div><img src="https://via.placeholder.com/150" alt="Yet Another Image" /></div>' },
  ]);

  const [leftSideItems, setLeftSideItems] = useState([]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDropLeft = (e) => {
    const itemId = e.dataTransfer.getData('text/plain');
    const item = items.find((item) => item.id === Number(itemId));
    setLeftSideItems((prevItems) => [...prevItems, { id: item.id, label: item.label, content: item.content }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Drag and Drop HTML Components</h1>
      <div className="drop-container">
        <div
          onDrop={handleDropLeft}
          onDragOver={handleDragOver}
          className="drop-space"
        >
          <h2>Left Drop Space</h2>
          {leftSideItems.map((item) => (
            <div key={item.id} className="dropped-item">
              {React.createElement('div', { dangerouslySetInnerHTML: { __html: item.content } })}
            </div>
          ))}
        </div>
        <div className="component-list">
          <h2>Component List</h2>
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="draggable-item"
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
