import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Images from "../assets/img/imagenes.jsx";

export const SaberMasVehiculos = () => {
    const { vehiculoId } = useParams();
    const [vehiculoDetails, setVehiculoDetails] = useState(null);
    const [vehiculo, setVehiculo] = useState(null);

    const obtenerVehiculo = async (vehiculo_Id) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/vehicles/${vehiculo_Id}`);

            if (!response.ok) {
                throw new Error(`Ha habido un error al cargar la información del vehículo ${vehiculo_Id}`);
            } 

            const data = await response.json();
            setVehiculoDetails(data.result.properties);
            setVehiculo(data.result);
        } catch (error) {
            console.error("Error obteniendo los datos del vehículo:", error);
        }
    };

    useEffect(() => {
        if (vehiculoId) {
            obtenerVehiculo(vehiculoId);
        }
    }, [vehiculoId]); 

    return (
        <div className="text-center">
            {vehiculoDetails ? (
                <div className="d-flex justify-content-left align-items-center vh-100">
                    <div className="d-flex flex-column align-items-center p-5" style={{ width: "100%" }}>
                        <h2 style={{
                            textAlign: "center",
                            marginTop: "20px",
                            position: "relative",
                            zIndex: 1
                        }}>
                            {vehiculoDetails.name}
                        </h2>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 2fr",
                            gap: "20px",
                            alignItems: "center",
                            marginTop: "20px"
                        }}>
                            <img
                                src={Images.vehicles[vehiculoDetails.name] || "https://via.placeholder.com/200"}
                                alt={vehiculoDetails.name}
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
                            <h5><strong>Model:</strong> {vehiculoDetails.model}</h5>
                            <h5><strong>Manufacturer:</strong> {vehiculoDetails.manufacturer}</h5>
                            <h5><strong>Max Atmosphering speed:</strong> {vehiculoDetails.max_atmosphering_speed} km/h</h5>
                            <h5><strong>Passengers:</strong> {vehiculoDetails.passengers}</h5>
                            <h5><strong>Class:</strong> {vehiculoDetails.vehicle_class}</h5>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading vehicle details...</p>
            )}
        </div>
    );
};