The most popular among these three today is using a JWT token to store user data in the browser’s LocalStorage upon a successful login, and pass it to the server with each request manually by the clients side code.
The second method is using a Cookie to store user data, and this is automatically attached to each request made to the server by the web browser
The third method, and in my opinion the most secure, and the topic of this tutorial series, is using Sessions based authentication. Sessions based authentication means that upon a successful login, a “session” entry containting the user data is created in the Database or an In-Memory Store like Redis on the Server, while a cookie with an expiry date, containing a sessionID to this session entry is sent to the client, this cookie is then automatically sent with each request, which is accepted by the server if it is not expired, and access is granted as a logged in user

TODOS



-Mostrar correctamente los emojis en la visualizacion del post

- Al mostrar la lista de mensajes, mostrar solo el titulo, user, fecha y mostrar el body cuando se produzca un mouseEnter.

-Autenticacion contra jwt en servidor en cada página, cuando no hay permisos para acceder a esa url, así indicarlo.

-Mostrar mensajes (alerts o toasts) cuando se produzcan eventos, por ejemplo al subir un nuevo post, o cuando hay un problema con el password introducido, etc.


- conseguir configurar Gmail OAuth para recibir mensajes en el buzon de entrada desde Contact

-al registrarse, verificacion de que no exista un usuario con ese username o email (incluir email). Login con gmail o facebook estaría bien.

-paginacion en la lista de posts de la página inicial, ¿incluir un filtro buscador exhaustivo por fecha, usuarios...?. Crear varios cientos de posts aleatorios para probar. 

-El menú desplegable se queda abierto tras haber clicado en alguna opcion, y deberia cerrarse automáticamente. 

-crear user roles, para que exista usuarios tipo admin con una funcionalidad extra a definir (por ejemplo, poder editar o eliminar post, usuarios, etc)

-Usabilidad: tras registro exitoso, mostrar un modal indicando que se está redirigiendo al home. Lo mismo tras realizar el logout.

-Edicion de la imagen subida por el usuario (al estilo facebook por ejemplo) para recortarla o redimensionarla antes de crear la nueva cuenta. Previsualizacion de la misma, edicion, y que esa imagen se muestra en la página perfil de usuario. La posibilidad de que el nuevo post tambien tenga su imagen de fondo.

-Perfil de usuario: se muestran sus mensajes, su imagen en el header, puede editar sus mensajes o eliminarlos. Eliminar cuenta.

-Crear un cookie legal para que el usuario acepte.

-Crear notificaciones para nuevos mensajes (usuarios o temas seguidos?)

-Incluir abajo, comentarios al post, likes...

-Pedir confirmacion al hacer logout

-Al ir a un mensaje, en lugar de mostrar en la url el id mongo, mostrar el titulo del post como veo que se hace en Medium y otros.

-La página about convertirla en la página del usuario, así se pueden ver todos los posts del mismo y sus datos. Quizás esta misma página es la que podría permitir editar si es el usuario logueado.

-(IMPORTANTE) Refactorizacion y organización optima del código y los modulos utilizados.

-Pasar el proyecto react al proyecto donde se emplea Webpack

-Documentar el README convenientemente.

- DONE Crear nuevo post (editor wysywyg)
-DONE El navLink sample post no tiene sentido que aparezca

-DONE cargar cada imagen en su header correspondiente


AVANZADO(deployment)

Crear webpack prod, dev...
Crear docker
Intentar desplegar el proyecto