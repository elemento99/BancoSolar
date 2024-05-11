import { Router } from 'express';
import { bancoSolarController } from '../controllers/bancosolar.controller.js';



const router = Router()



// //generemos  solicitudes get, por, put y delete
// //PATH/alumnos
// //obtener todos los alumnos registradors en music always
router.get('/', bancoSolarController.bancoUsuarios)
// //buscar a usuario por id
router.get('/:id', bancoSolarController.unicoUsuario)
//registrar a un nuevo usuario
router.post('/', bancoSolarController.registrarUsuario)
// //actualizar a estudiante
router.put('/?:id', bancoSolarController.actualizarUsuario)
// //eliminar estudiante
router.delete('/:id', bancoSolarController.eliminarUsuario)
// update saldo
// router.put('/', bancoSolarController.updateSaldo)


export default router; 