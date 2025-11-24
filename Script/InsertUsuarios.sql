/*
Clave sin encriptar= admin123
*/

INSERT INTO Usuarios(username,passwordHash,nombre,apellido,role,creado_en,activo,email)
     VALUES ('admin','$2b$10$HhzxrQa8xLNY2HtIBS64x.JL9oPYC42ySJWxk2yr2m6qSmiUKBzZK','Marvin','Illú','ADMIN',GETDATE(),1,'marvin.illu@gmail.com');
INSERT INTO Usuarios(username,passwordHash,nombre,apellido,role,creado_en,activo,email)
     VALUES ('tecnico','$2b$10$HhzxrQa8xLNY2HtIBS64x.JL9oPYC42ySJWxk2yr2m6qSmiUKBzZK','Daniel','Garcia','TECNICO',GETDATE(),1,'marvindaneil@hotmail.es');
INSERT INTO Usuarios(username,passwordHash,nombre,apellido,role,creado_en,activo,email)
     VALUES ('coordinador','$2b$10$HhzxrQa8xLNY2HtIBS64x.JL9oPYC42ySJWxk2yr2m6qSmiUKBzZK','André','Illú','COORDINADOR',GETDATE(),1,'andre@gmail.com');