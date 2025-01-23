const UserModel = require("../models/user.model");
const usersController = {};

usersController.createUser = async (req, res) => {
  const userInfo = req.body;
  const newUsers = new UserModel({ ...userInfo });
  try {
    await newUsers.save();
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: "Error reading database" + error });
  }
};

module.exports = usersController;

// usersController.getAllUsers = (req, res) => {
//   /*Primero leemos*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*Guardamos la información leida*/
//       const jsonData = JSON.parse(data);
//       res.status(200).json(jsonData);
//     }
//   });
// };

// usersController.deleteUser = (req, res) => {
//   /*buscar por id*/
//   const { id } = req.params;
// esto es igual a const (id = req.params.id) pero con esta manera hay que hacer una línea por constante, en la otra podemos meter las constantes en los {}
//   /*primero leer*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*econtrar el usuario por el id y con filter, queremos que nos muestre todos menos ese para borrarlo*/
//       const usersUpdate = jsonData.filter((user) => user.userId !== userId);
//       /*escribir lo nuevo*/
//       fs.writeFile(pathFile, JSON.stringify(usersUpdate), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(202).json(usersUpdate);
//         }
//       });
//     }
//   });
// };

// usersController.updateUsers = (req, res) => {
//   /*buscar por id*/
//   const { id } = req.params;
//   /*primero leemos para buscar*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*econtrar el usuari por el id*/
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json(userFound);
//       } else {
//         res.status(404).json({ error: "Usuario no encontrado" });
//       }
//       /*escribir los nuevos datos*/
//       userFound.name = req.body.name || userFound.name;
//       userFound.email = req.body.email || userFound.email;
//       /*escribir lo nuevo*/
//       fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(202).json(jsonData);
//         }
//       });
//     }
//   });
// };

// usersController.getUserById = (req, res) => {
//   const userId = req.params.id;

//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       const jsonData = JSON.parse(data);
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json([userFound]);
//       } else {
//         res.status(404).json({ error: "Usuario no encontrado" });
//       }
//     }
//   });
// };
