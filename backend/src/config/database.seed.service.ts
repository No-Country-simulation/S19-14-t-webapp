import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Occupation } from 'src/ocupations/entities/occupation.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

async function seedData() {
  const configService = new ConfigService();

  const connectionData = {
    host: configService.get<string>('MYSQL_HOST'),
    port: configService.get<number>('MYSQL_PORT'),
    username: configService.get<string>('MYSQL_USERNAME'),
    password: configService.get<string>('MYSQL_PASSWORD'),
    database: configService.get<string>('MYSQL_DATABASE'),
  };

  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: connectionData.host,
    port: connectionData.port,
    username: connectionData.username,
    password: connectionData.password,
    database: connectionData.database,
    logging: false,
  });

  sequelize.addModels([User, Occupation, Portfolio, Image, Service, Category]);

  await sequelize.sync();

  try {
    await Occupation.bulkCreate([
      {
        name: 'Electricista',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
      },
      {
        name: 'Jardinero',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140204/sm9eplcqwpvymgufivmr.png',
      },
      {
        name: 'Pintor',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140204/uxavrg1uqmi9hcwvgrnh.png',
      },
      {
        name: 'Plomero',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140204/qn1tenb27o2yalrlm40a.png',
      },
      {
        name: 'Mecanico',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140203/bt0aslcnhcz3ljgjrbrf.png',
      },
      {
        name: 'Reparador',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140203/t1bnk0movwrec1dqy1mi.png',
      },
      {
        name: 'Vidriero',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140202/ccaknl3cfz2tv9he14w4.png',
      },
      {
        name: 'Gasista y Calefaccion',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140202/vdpqwguxqndh403dqcjo.png',
      },
      {
        name: 'Albañil',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140201/wkbmmdarvwzdokpqwm55.png',
      },
      {
        name: 'Cerrajero',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140201/atgm4nzc5jr84somx1nj.png',
      },
      {
        name: 'Tecnico refrigeracion',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140201/f7pnd0zayquj51dsu6ap.png',
      },
      {
        name: 'Carpintero',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140200/rkg8e1lcithqg30gek7x.png',
      },
      {
        name: 'Decoracion',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140201/y4x2yk3ij5stgass6voe.png',
      },
      {
        name: 'Fumigador',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140200/jtm9gcawfpshszgwtqhz.png',
      },
      {
        name: 'Limpieza',
        icon: 'https://res.cloudinary.com/db395v0wf/image/upload/v1733140200/q2sn2jhbuaghjtxp0sb0.png',
      },
    ]);

    await User.bulkCreate([
      {
        name: 'Juan',
        lastName: 'Perez',
        email: 'juan.perez@example.com',
        password: 'password123',
        role: 'SERVICE',
        image_id: 1,
        is_active: true,
        phone: '1234567890',
        location: 'Buenos Aires',
        occupation_id: 1,
      },
      {
        name: 'Carlos',
        lastName: 'Gomez',
        email: 'carlos.gomez@example.com',
        password: 'password123',
        role: 'SERVICE',
        image_id: 1,
        is_active: true,
        phone: '0987654321',
        location: 'Cordoba',
        occupation_id: 2,
      },
      {
        name: 'Martin',
        lastName: 'Lopez',
        email: 'martin.lopez@example.com',
        password: 'password123',
        role: 'SERVICE',
        image_id: 1,
        is_active: true,
        phone: '1122334455',
        location: 'Rosario',
        occupation_id: 3,
      },
      {
        name: 'Federico',
        lastName: 'Martinez',
        email: 'federico.martinez@example.com',
        password: 'password123',
        role: 'SERVICE',
        image_id: 1,
        is_active: true,
        phone: '2233445566',
        location: 'Mendoza',
        occupation_id: 4,
      },
      {
        name: 'Lucas',
        lastName: 'Fernandez',
        email: 'lucas.fernandez@example.com',
        password: 'password123',
        role: 'SERVICE',
        image_id: 1,
        is_active: true,
        phone: '3344556677',
        location: 'La Plata',
        occupation_id: 5,
      },
      {
        name: 'Diego',
        lastName: 'Ramirez',
        email: 'diego.ramirez@example.com',
        password: 'password123',
        role: 'CLIENT',
        image_id: 1,
        is_active: true,
        phone: '4455667788',
        location: 'Salta',
        occupation_id: 6,
      },
      {
        name: 'Santiago',
        lastName: 'Sosa',
        email: 'santiago.sosa@example.com',
        password: 'password123',
        role: 'CLIENT',
        image_id: 1,
        is_active: true,
        phone: '5566778899',
        location: 'Santa Fe',
      },
      {
        name: 'Matias',
        lastName: 'Diaz',
        email: 'matias.diaz@example.com',
        password: 'password123',
        role: 'CLIENT',
        image_id: 1,
        is_active: true,
        phone: '6677889900',
        location: 'Tucuman',
      },
    ]);

    await Category.bulkCreate([
      { name: 'Electricidad' },
      { name: 'Jardinería' },
      { name: 'Pintura' },
      { name: 'Plomería' },
      { name: 'Mecánica' },
      { name: 'Reparaciones' },
      { name: 'Vidriería' },
      { name: 'Gas y Calefacción' },
      { name: 'Albañilería' },
      { name: 'Cerrajería' },
      { name: 'Refrigeración' },
      { name: 'Carpintería' },
      { name: 'Decoración' },
      { name: 'Fumigación' },
      { name: 'Limpieza' },
    ]);

    await Service.bulkCreate([
      {
        title: 'Instalación eléctrica',
        summary: 'Instalación de sistemas eléctricos en hogares y oficinas.',
        description:
          'Realizamos instalaciones eléctricas completas, incluyendo cableado, enchufes, interruptores y más.',
        price: 1500,
        categoryId: 1,
        userId: 1,
      },
      {
        title: 'Mantenimiento de jardines',
        summary: 'Servicios de mantenimiento y cuidado de jardines.',
        description:
          'Ofrecemos servicios de poda, riego, fertilización y diseño de jardines.',
        price: 1200,
        categoryId: 2,
        userId: 2,
      },
      {
        title: 'Pintura de interiores',
        summary: 'Pintura de interiores para hogares y oficinas.',
        description:
          'Realizamos trabajos de pintura en interiores, utilizando materiales de alta calidad.',
        price: 1000,
        categoryId: 3,
        userId: 3,
      },
      {
        title: 'Reparación de tuberías',
        summary: 'Servicios de reparación y mantenimiento de tuberías.',
        description:
          'Ofrecemos servicios de reparación de fugas, instalación de tuberías nuevas y mantenimiento preventivo.',
        price: 1300,
        categoryId: 4,
        userId: 4,
      },
      {
        title: 'Reparación de vehículos',
        summary: 'Servicios de reparación y mantenimiento de vehículos.',
        description:
          'Realizamos diagnósticos y reparaciones de todo tipo de vehículos, incluyendo cambio de aceite, frenos y más.',
        price: 2000,
        categoryId: 5,
        userId: 5,
      },
    ]);

    await Portfolio.bulkCreate([
      {
        title: 'Proyecto Eléctrico',
        description: 'Instalación eléctrica completa en una casa de dos pisos.',
        date: new Date(),
        user_id: 1,
        image_id: 14,
      },
      {
        title: 'Jardín Moderno',
        description:
          'Diseño y mantenimiento de un jardín moderno en una oficina.',
        date: new Date(),
        user_id: 2,
        image_id: 15,
      },
      {
        title: 'Pintura de Oficina',
        description: 'Pintura de interiores en una oficina corporativa.',
        date: new Date(),
        user_id: 3,
        image_id: 16,
      },
    ]);

    await Image.bulkCreate([
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 1,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 2,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 3,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 4,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 5,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 6,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 7,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733140205/y0lgoc3ufylikl402btw.png',
        public_id: 'y0lgoc3ufylikl402btw',
        user_id: 8,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        service_id: 1,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        service_id: 2,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        service_id: 3,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        service_id: 4,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        service_id: 5,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        portfolio_id: 1,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        portfolio_id: 2,
      },
      {
        imageUrl:
          'https://res.cloudinary.com/db395v0wf/image/upload/v1733141370/avadzggubdcp4dbr2e4i.png',
        public_id: 'y0lgoc3ufylikl402btw',
        portfolio_id: 3,
      },
    ]);

    console.log('Seeding completado exitosamente.');
  } catch (error) {
    console.error('Error durante el seeding:', error);
  } finally {
    await sequelize.close();
  }
}

seedData();
