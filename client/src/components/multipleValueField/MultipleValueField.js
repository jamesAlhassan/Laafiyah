import React, { useState } from 'react';
import './MultipleValueField.css';

function MultipleValueField({ items, setItems }) {

    const [inputValue, setInputValue] = useState(''); // Store the input value
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [editedItem, setEditedItem] = useState(''); // Store the edited item
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle "Add" button click
    const handleAddClick = (e) => {
        e.preventDefault();
        
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue.trim()]);
            setInputValue('');
        }
    };

    // Handle "Edit" button click
    const handleEditClick = (e) => {
        e.preventDefault();

        setEditedItem(items.join(', '));
        setIsEditing(true);
        setShowModal(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsEditing(false);
        setShowModal(false);
    };

    // Handle save changes in modal
    const handleSaveChanges = () => {
        const editedItems = editedItem.split(',').map((item) => item.trim());
        setItems(editedItems.filter((item) => item !== '')); // Remove empty items
        setShowModal(false);
    };

    return (
        <div className="multiple-value-field">
            <div className="input-section">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter an item"
                />
                <button onClick={handleAddClick}>Add</button>
                <button onClick={handleEditClick}>Edit</button>
            </div>
            {items?.length > 0 && (
                <div className="item-list">
                    <span>{items.join(', ')}</span>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Items</h2>
                        <textarea
                            value={editedItem}
                            onChange={(e) => setEditedItem(e.target.value)}
                        />
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MultipleValueField;
