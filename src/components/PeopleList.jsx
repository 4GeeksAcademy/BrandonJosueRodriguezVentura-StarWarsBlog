import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Images from "../assets/img/imagenes";
import { Link } from "react-router-dom";

export const PeopleList = () => {
  const { store, dispatch } = useGlobalReducer();

  const obtenerPersonajes = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/people");

      if (!response.ok) {
        throw new Error("Ha ocurrido un error al obtener los personajes");
      }

      const data = await response.json();
      console.log("Datos obtenidos de personajes:", data);  

      if (data.results && data.results.length > 0) {
        const personajesConDetalles = await Promise.all(
          data.results.map(async (personaje) => {
            const detallesResponse = await fetch(personaje.url);
            const detallesData = await detallesResponse.json();
            return {
              ...personaje,
              details: detallesData.result.properties,
            };
          })
        );

        dispatch({ type: "get_people", payload: { people: personajesConDetalles } });
        console.log("Personajes con detalles:", personajesConDetalles);  
      } else {
        console.error("No se encontraron personajes.");
      }
    } catch (error) {
      console.log("Error al obtener personajes: ", error);
    }
  };

  useEffect(() => {
    obtenerPersonajes();
  }, []);

  const toggleFavorite = (item, type) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === item.uid && fav.type === type);
    if (isFavorite) {
      dispatch({ type: "remove_from_favorites", payload: { uid: item.uid, type } });
    } else {
      dispatch({ type: "add_to_favorites", payload: { ...item, type } });
    }
  };


  if (!store.people || store.people.length === 0) {
    return <p>Loaging characters...</p>;
  }

  return (
    <ul className="d-flex scrollable-list p-2">
      {store.people.map((personaje) => (
        <li
          key={personaje.uid || personaje.name}
          className="border p-3 m-2 rounded d-flex flex-column text-center"
          style={{ width: "220px", height: "450px", display: "flex", alignItems: "center" }}
        >

          <div style={{ minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{ fontSize: "18px", margin: "0", textAlign: "center" }}>{personaje.name}</h2>
          </div>

          <img
            src={Images.people[personaje.name] || "https://via.placeholder.com/200"}
            alt={personaje.name}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              display: "block",
              marginTop: "10px",
            }}
          />


          <div className="d-flex  flex-column flex-grow-1">
            {personaje.details ? (
              <>
                <p><strong>Génder:</strong> {personaje.details.gender}</p>
                <p><strong>Height:</strong> {personaje.details.height} cm</p>
              </>
            ) : (
              <p>Loading Details...</p>
            )}

            <Link to={`/saber-mas-personaje/${personaje.uid}`} className="btn btn-primary mt-auto">
              Learn more
            </Link>
            <button
              className={`btn ${store.favorites.some((fav) => fav.uid === personaje.uid && fav.type === "people")
                  ? "btn-danger"
                  : "btn-outline-warning"
                }`}
              onClick={() => toggleFavorite(personaje, "people")}
            >
              <i className={`fa-heart ${store.favorites.some((fav) => fav.uid === personaje.uid && fav.type === "people")
                  ? "fa-solid"
                  : "fa-regular"
                }`}></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};