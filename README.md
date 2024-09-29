
# Proyecto de Gestión de Clientes y Pagos

Este proyecto es una solución que gestiona clientes, recargas y pagos utilizando una arquitectura basada en contenedores Docker. Consta de tres componentes principales:

1. **Frontend**: Construido con Next.js.
2. **API REST**: Construido con NestJS.
3. **Microservicio**: Un servicio de backend adicional que maneja la lógica de negocio crítica y se conecta a la base de datos MongoDB.

La arquitectura del proyecto sigue un enfoque de microservicios, con un frontend que se comunica con una API Gateway que actúa como proxy para un microservicio. La API REST está documentada con Swagger, lo que permite visualizar y probar los endpoints disponibles.

## Tecnologías utilizadas

- **Next.js**: Framework para el frontend con soporte para SSR (Server-Side Rendering) y CSR (Client-Side Rendering).
- **NestJS**: Framework para el backend API REST y microservicio.
- **MongoDB**: Base de datos.
- **Prisma**: ORM para gestionar la base de datos MongoDB (Es perfectamente configurable con una Base de datos relacional).
- **Docker**: Contenerización de los servicios para un despliegue sencillo.
- **Swagger**: Para la documentación automática de la API.

## Requisitos previos

- **Docker**: Asegúrate de tener Docker instalado en tu sistema.

## Instrucciones de instalación

### Paso 1: Clonar el repositorio

Clona el repositorio en tu máquina local.

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### Paso 2: Configurar variables de entorno

Por defecto ya estan configuradas para correr los contenedores Docker, sin embargo para cada proyecto existe un archivo `.env.example` que especifica las variables necesarias del mismo.

### Paso 3: Construir y ejecutar los contenedores

Para construir y ejecutar los contenedores, ejecuta el siguiente comando:

```bash
docker-compose up --build
```

Esto levantará los servicios:

- **Frontend**: Visita `http://localhost:3000` para acceder a la aplicación web.
- **API REST**: La API se encuentra disponible en `http://localhost:4000`.
- **Microservicio** Conectado a la API REST en segundo plano (se corre en `http://localhost:4001` pero no es accesible).
- **OpenAPI (Documentación de la API con Swagger)**: Para ver y probar los endpoints de la API, visita `http://localhost:4000/docs`.

### Funcionalidad de los servicios

#### 1. **Frontend (Next.js)**

El frontend es una aplicación en **Next.js** que permite a los usuarios interactuar con el sistema de clientes y pagos. Se conecta con la API REST para realizar operaciones como:

- Cargar la lista de clientes.
- Registrar nuevos clientes.
- Realizar recargas de saldo.
- Verificar el balance actual.
- Realizar pagos.
- Confirmar pagos.

#### 2. **API REST (NestJS)**

La **API REST** actúa como un gateway que expone los servicios disponibles para el frontend. No se conecta directamente a la base de datos, sino que redirige las solicitudes a un microservicio utilizando un protocolo de comunicación interno (TCP).

Los endpoints están documentados con Swagger y puedes verlos en `http://localhost:4000/docs`.

#### 3. **Microservicio (NestJS)**

El **Microservicio** es responsable de toda la lógica de negocio. Este servicio se conecta directamente a la base de datos **MongoDB** utilizando **Prisma** como ORM para gestionar la persistencia de datos. El microservicio maneja:

- Almacenamiento y gestión de los datos de clientes.
- Procesamiento de pagos y recargas.
- Consultas de balances.

#### 4. **Base de datos MongoDB**

El sistema usa **MongoDB** como base de datos. El microservicio se conecta a la base de datos para leer y escribir información de los clientes, pagos, recargas, etc.

## Comandos útiles

- **Construir contenedores**: `docker-compose build`
- **Levantar los servicios**: `docker-compose up`
- **Detener los servicios**: `docker-compose down`
- **Verificar los logs**: `docker-compose logs -f`

## Conclusión

Este proyecto demuestra una arquitectura basada en microservicios con una API REST, un microservicio conectado a una base de datos, y un frontend que consume los servicios de la API. Gracias a **Docker**, todos los servicios pueden levantarse fácilmente en cualquier máquina.