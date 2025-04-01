import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Images from "../assets/img/imagenes.jsx";

export const SaberMasPersonajes = () => {
    const { characterId } = useParams();
    const [characterDetails, setCharacterDetails] = useState(null);

    const obtenerPersonaje = async (personaje_id) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/people/${personaje_id}`);

            if (!response.ok) {
                throw new Error(`Error al obtener la información del personaje ${personaje_id}`);
            }

            const data = await response.json();
            setCharacterDetails(data.result.properties);
        } catch (error) {
            console.error("Error obteniendo los datos del personaje:", error);
        }
    };

    useEffect(() => {
        if (characterId) {
            obtenerPersonaje(characterId);
        }
    }, [characterId]);

    return (
        <div className="text-center">
            {characterDetails ? (
                <div className="d-flex justify-content-left align-items-center vh-100">
                    <h1 style={{
                        textAlign: "center",
                        position: "absolute",  
                        top: "20px",           
                        left: "50%",           
                        transform: "translateX(-50%)", 
                        zIndex: 1 
                    }}>
                        {characterDetails?.name || "Cargando nombre..."}
                    </h1>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", alignItems: "center" }}>
                        <img
                            src={Images.people[characterDetails.name] || "https://via.placeholder.com/200"}
                            alt={characterDetails.name}
                            style={{ width: "500px", height: "500px", objectFit: "cover", marginRight: "20px" }}
                        />
                        <h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, eum, dolorum asperiores quo quidem magni nihil voluptatibus explicabo hic eius eos, perspiciatis sapiente! Fugiat repellendus deserunt illum nulla voluptatem alias voluptates commodi totam, ipsum quae magni molestiae nostrum quod voluptatum aperiam dolores velit excepturi ex facilis perferendis beatae eligendi sed magnam. Aut quas voluptas quod ipsam nostrum nisi ducimus quidem magni non nemo ullam, similique exercitationem, odit dicta, adipisci blanditiis culpa error? Perferendis, voluptatem, nostrum, magni libero sed tempora sequi nobis corporis impedit ab facere. Quia dolore necessitatibus fugiat aperiam consectetur veniam eveniet, quod optio sed quasi modi fugit voluptas magnam tenetur molestiae nobis exercitationem nihil nulla ducimus totam ea? Doloremque dolorum eos dolor, at neque debitis adipisci error quos alias. Expedita maiores similique officia vero enim, a, eveniet blanditiis voluptas quibusdam quo ducimus corporis eaque voluptatibus sed, autem architecto dolorem. Omnis tenetur recusandae nostrum, molestias nam eos. Temporibus fuga quas neque adipisci! Ipsum molestias tempore, magni fuga voluptatem alias, architecto libero, recusandae dolor placeat enim nostrum? Fugiat, laudantium tempore, quos numquam magni debitis consectetur quo, voluptates soluta asperiores suscipit quasi in sequi necessitatibus fuga. Quidem magni fuga quibusdam? Iusto odio atque architecto eius cum aliquid, delectus veniam nemo et?
                        </h5>

                        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <h5><strong>Génder:</strong> {characterDetails.gender}</h5>
                            <h5><strong>Height:</strong> {characterDetails.height} cm</h5>
                            <h5><strong>Mass:</strong> {characterDetails.mass} kg</h5>
                            <h5><strong>Hair Color:</strong> {characterDetails.hair_color}</h5>
                            <h5><strong>Skin Color:</strong> {characterDetails.skin_color}</h5>
                            <h5><strong>Birth Year:</strong> {characterDetails.birth_year}</h5>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading Character details...</p>
            )}
        </div>
    );
};