import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Images from "../assets/img/imagenes.jsx";
import { Link } from "react-router-dom";
import { FavoritosDropdown } from "../components/FavoritosDropdown";
import { PeopleList } from "../components/PeopleList"; 
import { VehiclesList } from "../components/VehiclesList.jsx";

const API_BASE = "https://www.swapi.tech/api/";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const obtenerPlanetas = async () => {
    try {
      const response = await fetch(API_BASE + "planets");

      if (!response.ok) {
        throw new Error("Ha ocurrido un error al obtener los planetas");
      }

      const data = await response.json();

      const planetasConDetalles = await Promise.all(
        data.results.map(async (planet) => {
          const detallesResponse = await fetch(planet.url);
          const detallesData = await detallesResponse.json();
          return {
            ...planet,
            details: detallesData.result.properties,
          };
        })
      );

      dispatch({ type: "get_planets", payload: { planets: planetasConDetalles } });

    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    obtenerPlanetas();
  }, []);

  const toggleFavorite = (item, type) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === item.uid && fav.type === type);
    if (isFavorite) {
      dispatch({ type: "remove_from_favorites", payload: { uid: item.uid, type } });
    } else {
      dispatch({ type: "add_to_favorites", payload: { ...item, type } });
    }
  };

  return (
    <div className="text-center mt-5">
      <div className="align-items-right justify-items-right">
        <FavoritosDropdown />
      </div>

      <h1>Lista of planets</h1>
      <ul className="d-flex scrollable-list p-2">
        {store.planets && store.planets.length > 0 ? (
          store.planets.map((planet) => (
            <li
              key={planet.uid}
              className="border p-3 m-2 rounded d-flex flex-column"
              style={{ width: "220px", height: "450px" }}
            >
              <h2>{planet.name}</h2>
              <img
                src={Images.planets[planet.name] || "https://via.placeholder.com/200"}
                alt={planet.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div className="d-flex flex-column flex-grow-1">
                {planet.details ? (
                  <>
                    <p>
                      <strong>Climate:</strong> {planet.details.climate}
                    </p>
                    <p>
                      <strong>Diámeter:</strong> {planet.details.diameter} km
                    </p>
                  </>
                ) : (
                  <p>Loading details...</p>
                )}
                <Link to={`/saber-mas-planeta/${planet.uid}`} className="btn btn-primary mt-auto">
                  Learn more
                </Link>
                <button
                  className={`btn ${
                    store.favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets")
                      ? "btn-danger"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => toggleFavorite(planet, "planets")}
                >
                  <i
                    className={`fa-heart ${
                      store.favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets")
                        ? "fa-solid"
                        : "fa-regular"
                    }`}
                  ></i>
                </button>
              </div>
            </li>
          ))
        ) : (
           <p>Loading planets...</p>
        )}
      </ul>
      <h1>List of characters</h1>
      <PeopleList /> 
      <h1>List of Vehicles</h1>
      <VehiclesList/>
    </div>
  );
};