import { Transfer } from "../models/transferencia.model.js"

const transferAll = async (req, res) => {
    const transfers = await Transfer.findAll()
    return res.json(transfers)
}

const transferMont = async (req, res) => {
    try {
        const { origen, destino, valor } = req.body;
        const response = await Transfer.create(origen, destino, valor);

        if (!response.ok) {
            // Si la creación falla, responde con un estado 500 y la respuesta del error
            return res.status(500).json({ message: "Error al crear la transferencia", error: response });
        }

        // Si la creación es exitosa, responde con la respuesta de la creación
        return res.json(response);
    } catch (error) {
        // Si hay un error inesperado, responde con un estado 500 y el mensaje de error
        console.error("Error al crear la transferencia:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}


export const transferencia = {
transferAll,
transferMont,
}