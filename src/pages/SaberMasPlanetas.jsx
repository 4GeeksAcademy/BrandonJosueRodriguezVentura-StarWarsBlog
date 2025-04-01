import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Images from "../assets/img/imagenes.jsx";

export const SaberMasPlanetas = () => {
    const { planetId } = useParams();
    const [planetDetails, setPlanetDetails] = useState(null);
    const [Planet, setPlanet] = useState(null);

    const obtenerPlaneta = async (planet_Id) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/planets/${planet_Id}`);

            if (!response.ok) {
                throw new Error(`Ha habido un error al cargar la información del planeta ${planet_Id}`);
            } 

            const data = await response.json();
            setPlanetDetails(data.result.properties);
            setPlanet(data.result);
        } catch (error) {
            console.error("Error obteniendo los datos del planeta:", error);
        }
    };

    useEffect(() => {
        if (planetId) {
            obtenerPlaneta(planetId);
        }
    }, [planetId]); 

    return (
        <div className="text-center">
    {planetDetails ? (
        <div className="d-flex justify-content-left align-items-center vh-100">
            <div className="d-flex flex-column align-items-center p-5" style={{ width: "100%" }}>
                <h2 style={{
                    textAlign: "center",
                    marginTop: "20px",
                    position: "relative",
                    zIndex: 1
                }}>
                    {planetDetails.name}
                </h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "20px",
                    alignItems: "center",
                    marginTop: "20px"
                }}>
                    <img
                        src={Images.planets[planetDetails.name] || "https://via.placeholder.com/200"}
                        alt={planetDetails.name}
                        style={{ width: "500px", height: "500px", objectFit: "cover" }}
                    />
                    <div style={{ fontSize: "18px", textAlign: "left" }}>
                        <h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit consequatur expedita possimus? Quae perferendis accusantium magnam adipisci, obcaecati beatae maiores earum. Dolore ducimus quo adipisci enim, delectus nostrum placeat odit necessitatibus nobis eum saepe voluptates ex officiis ab ut est autem optio quas! Repellat doloribus aperiam, ratione praesentium rem temporibus aliquid nihil nulla. Quibusdam, rerum nostrum rem consequuntur, ducimus, laborum autem unde praesentium atque ab quaerat veritatis. Sed eius expedita officiis tempora, corporis aut voluptatum est deserunt accusantium numquam. Commodi veniam adipisci provident in, labore modi aperiam architecto facere tempora earum excepturi! Minus consequatur laboriosam repellat vel ipsam inventore expedita?
                        </h5>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    width: "100%"
                }}>
                    <h5><strong>Climate:</strong> {planetDetails.climate}</h5>
                    <h5><strong>Diameter:</strong> {planetDetails.diameter} km</h5>
                    <h5><strong>Terrain:</strong> {planetDetails.terrain}</h5>
                    <h5><strong>Surface Water:</strong> {planetDetails.surface_water}</h5>
                    <h5><strong>Rotation Period:</strong> {planetDetails.rotation_period} hours</h5>
                    <h5><strong>Gravity:</strong> {planetDetails.gravity}</h5>
                    <h5><strong>Orbital Period:</strong> {planetDetails.orbital_period}</h5>
                    <h5><strong>Population:</strong> {planetDetails.population}</h5>
                </div>
            </div>
        </div>
    ) : (
        <p>Loading planet details...</p>
    )}
</div>
    );
};