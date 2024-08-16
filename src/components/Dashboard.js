// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import AddWidgetModal from './AddWidgetModal';
import './Dashboard.css'; // Importing the CSS

const initialData = {
  categories: [
    {
      id: 'cspm_exec_dashboard',
      name: 'CSPM Executive Dashboard',
      widgets: []
    },
    {
      id: 'another_category',
      name: 'Another Category',
      widgets: []
    }
  ]
};

const Dashboard = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('dashboardData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }, [data]);

  const addWidget = (categoryId, widget) => {
    const updatedCategories = data.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: [...category.widgets, widget]
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = data.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const filteredCategories = data.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const openAddWidgetModal = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const closeAddWidgetModal = () => {
    setIsModalOpen(false);
    setCurrentCategoryId(null);
  };

  return (
    <div className="dashboard-container">
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="categories">
        {filteredCategories.map(category => (
          <div key={category.id} className="category">
            <h2 className="category-title">{category.name}</h2>
            <div className="widgets">
              {category.widgets.map(widget => (
                <div key={widget.id} className="widget">
                  <span className="widget-name">{widget.name}</span>
                  <button
                    onClick={() => removeWidget(category.id, widget.id)}
                    className="remove-widget"
                  >
                    &times;
                  </button>
                  <p className="widget-text">{widget.text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => openAddWidgetModal(category.id)}
              className="add-widget-button"
            >
              + Add Widget
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddWidgetModal
          onClose={closeAddWidgetModal}
          onAdd={addWidget}
          categoryId={currentCategoryId}
        />
      )}
    </div>
  );
};

export default Dashboard;
