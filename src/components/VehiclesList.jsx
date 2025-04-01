import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Images from "../assets/img/imagenes";
import { Link } from "react-router-dom";

export const VehiclesList = () => {
    const { store, dispatch } = useGlobalReducer();

    const obtenerVehiculos = async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/vehicles");
            if (!response.ok) {
                throw new Error("No se pudieron obtener los vehículos");
            }

            const data = await response.json();
            console.log("Datos de vehículos:", data); 

            if (data.results && data.results.length > 0) {
                const vehiculoConDetalles = await Promise.all(
                    data.results.map(async (vehiculo) => {
                        const detallesResponse = await fetch(vehiculo.url);
                        const detallesData = await detallesResponse.json();
                        return {
                            ...vehiculo,
                            details: detallesData.result.properties,
                        };
                    })
                );

                dispatch({ type: "get_vehicles", payload: { vehicles: vehiculoConDetalles } });
            } else {
                console.error("No se encontraron vehículos.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtenerVehiculos();
    }, []);

    const toggleFavorite = (item, type) => {
        const isFavorite = store.favorites.some((fav) => fav.uid === item.uid && fav.type === type);
        if (isFavorite) {
            dispatch({ type: "remove_from_favorites", payload: { uid: item.uid, type } });
        } else {
            dispatch({ type: "add_to_favorites", payload: { ...item, type } });
        }
    };

    if (!store.vehicles || store.vehicles.length === 0) {
        return <p>Loading vehicles...</p>;
    }

    return (
        <div>
            <ul className="d-flex scrollable-list p-2">
                {store.vehicles.map((vehiculo) => (
                    <li
                        key={vehiculo.uid || vehiculo.name}
                        className="border p-3 m-2 rounded d-flex flex-column text-center"
                        style={{ width: "220px", height: "450px", display: "flex", alignItems: "center" }}
                    >
                        <div style={{ minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h2 style={{ fontSize: "18px", margin: "0", textAlign: "center" }}>{vehiculo.name}</h2>
                        </div>

                        <img
                            src={Images.vehicles[vehiculo.name] || "https://via.placeholder.com/200"}
                            alt={vehiculo.name}
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                display: "block",
                                marginTop: "10px",
                            }}
                        />

                        <div className="d-flex flex-column flex-grow-1">
                            {vehiculo.details ? (
                                <>
                                    <p><strong>Model:</strong> {vehiculo.details.model}</p>
                                </>
                            ) : (
                                <p>Loading details...</p>
                            )}

                            <Link to={`/saber-mas-vehiculo/${vehiculo.uid}`} className="btn btn-primary mt-auto">
                                Learn more
                            </Link>
                            <button
                                className={`btn ${store.favorites.some((fav) => fav.uid === vehiculo.uid && fav.type === "vehicles")
                                    ? "btn-danger"
                                    : "btn-outline-warning"
                                    }`}
                                onClick={() => toggleFavorite(vehiculo, "vehicles")}
                            >
                                <i className={`fa-heart ${store.favorites.some((fav) => fav.uid === vehiculo.uid && fav.type === "vehicles")
                                    ? "fa-solid"
                                    : "fa-regular"
                                    }`}></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};