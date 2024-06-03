import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const addItem = () => {
    if (text.trim() !== "") {
      const newItem = { id: Date.now(), text: text };
      setItems([...items, newItem]);
      setText("");
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleEditMode = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.editMode = !item.editMode;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const saveChanges = (id, newText) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.text = newText;
        item.editMode = false;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <div className="todo-container">
        <div id="groceryList">
          <div id="addItemContainer">
            <input
              type="text"
              id="addItemInput"
              placeholder="Add a new todo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && addItem()}
            />
            <button id="addItemButton" onClick={addItem}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div id="itemsContainer">
            {items.map((item, index) => (
              <div key={item.id} className={item.editMode ? "item edit-mode" : "item"}>
                <span className="item-number">{index + 1}</span>
                {item.editMode ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        const updatedItems = items.map((it) => {
                          if (it.id === item.id) {
                            return { ...it, text: newText };
                          }
                          return it;
                        });
                        setItems(updatedItems);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && saveChanges(item.id, item.text)}
                      autoFocus
                    />
                    <button onClick={() => saveChanges(item.id, item.text)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{item.text}</span>
                    <button onClick={() => toggleEditMode(item.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </>
                )}
                <button onClick={() => deleteItem(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
