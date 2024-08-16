// src/components/AddWidgetModal.js
import React, { useState } from 'react';
import './AddWidgetModal.css'; // Importing the CSS

const AddWidgetModal = ({ onClose, onAdd, categoryId }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [isNameChecked, setIsNameChecked] = useState(true);
  const [isTextChecked, setIsTextChecked] = useState(true);

  const handleAddWidget = () => {
    if (widgetName && widgetText && isNameChecked && isTextChecked) {
      const newWidget = {
        id: `widget_${new Date().getTime()}`, // Generating a unique ID
        name: widgetName,
        text: widgetText,
      };
      onAdd(categoryId, newWidget);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Add New Widget</h3>

        <div className="modal-input-group">
          <input
            type="checkbox"
            checked={isNameChecked}
            onChange={() => setIsNameChecked(!isNameChecked)}
          />
          <input
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={e => setWidgetName(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-input-group">
          <input
            type="checkbox"
            checked={isTextChecked}
            onChange={() => setIsTextChecked(!isTextChecked)}
          />
          <textarea
            placeholder="Widget Text"
            value={widgetText}
            onChange={e => setWidgetText(e.target.value)}
            className="modal-textarea"
          />
        </div>

        <div className="modal-buttons">
          <button
            onClick={handleAddWidget}
            className="modal-button"
            disabled={!isNameChecked || !isTextChecked}
          >
            Add
          </button>
          <button onClick={onClose} className="modal-button cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
