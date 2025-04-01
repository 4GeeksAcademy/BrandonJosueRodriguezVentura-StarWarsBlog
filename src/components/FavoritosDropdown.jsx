import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const FavoritosDropdown = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const removeFavorite = (uid, type) => {
    dispatch({ type: "remove_from_favorites", payload: { uid, type } });
  };

  return (
    <div className="favoritos-dropdown">
      <button className="favoritos-btn" onClick={toggleDropdown}>
        Favorites
      </button>
      {isOpen && (
        <ul className="favoritos-list">
          {store.favorites.length > 0 ? (
            store.favorites.map((fav) => (
              <li key={fav.uid} className="favorito-item">
                <span>{fav.name}</span>
                <button
                  className="btn btn-sm ml-2"
                  onClick={() => removeFavorite(fav.uid, fav.type)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </li>
            ))
          ) : (
            <li>Not Favorites</li>
          )}
        </ul>
      )}
    </div>
  );
};