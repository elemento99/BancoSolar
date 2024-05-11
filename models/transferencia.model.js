import { pool } from "../database/connection.js"


const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM TRANSFER")
    return rows
}


const create = async (cuentaOrigen, cuentaDestino, monto) => {
    try {
        const fecha = new Date(); 

        await pool.query('BEGIN');

        const query1 = {
            text: 'UPDATE USUARIOS SET BALANCE = BALANCE - $1 WHERE ID = $2 RETURNING *',
            values: [monto, cuentaOrigen],
        };
        await pool.query(query1);

        const query2 = {
            text: 'UPDATE USUARIOS SET BALANCE = BALANCE + $1 WHERE ID = $2 RETURNING *',
            values: [monto, cuentaDestino],
        };
        await pool.query(query2);

        const query3 = {
            text: 'INSERT INTO TRANSFER (ORIGEN, DESTINO, VALOR, FECHA) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [cuentaOrigen, cuentaDestino, monto, fecha],
        };
        const { rows } = await pool.query(query3);

        await pool.query('COMMIT');

        return {
            ok: true,
            msg: 'Transferencia correcta',
            data: rows[0],
        };
    } catch (error) {
        console.error('Error en la transferencia:', error);

        await pool.query('ROLLBACK');

        return {
            ok: false,
            msg: 'No se pudo transferir el monto',
        };
    }
};

  export const Transfer = {
    findAll,
    create,
  };