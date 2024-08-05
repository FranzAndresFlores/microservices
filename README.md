# Microservicios

Proyecto de uso de microservicios.

## Tecnologías
- Node JS
- Express
- Sequelize
- MySQL

## Ejecución de la aplicación
1. Clonar el repositorio

2. Ejecutar el comando para las instalaciones correspondientes.
```
npm install
```

3. Clonar el archivo ```.env.example``` y renombrar la copia a ```.env```. 

4. Definir las variables de entorno definidas en el  ```.env```. Es necesario crear las bases de datos correspondientes antes de ejecutar la aplicación.

5. Ejecutar docker para la construcción y levantamiento de las imágenes de la aplicación:
```
docker-compose up -d --build 
```

## Ejecución de pruebas unitarias e integración
1. Ingresar en el proyecto de microservice-2
```
cd microservice-2
```

2. Ejecutar el comando de pruebas
```
npm run test
```

