import { DataSource } from 'typeorm';
import { MaterialType, Project, RoofType, StyleType } from '../project/entity';
import 'dotenv/config';
import { ProjectImage } from '../project-images/entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Project, ProjectImage],
  synchronize: true, // можно оставить включённым только для сидов
});

async function seed() {
  await AppDataSource.initialize();

  const projectRepo = AppDataSource.getRepository(Project);

  await AppDataSource.query(
    'TRUNCATE TABLE "projects" RESTART IDENTITY CASCADE',
  );

  const projects = [
    {
      title: 'Дом Хай-Тек',
      description:
        'Современный дом. Чистые линии, большие окна и светлая отделка создают ощущение уюта и простора. Благодаря SIP-панелям дом быстро возводится, отличается энергоэффективностью и низкими затратами на отопление. Подойдёт как для постоянного проживания, так и для загородного отдыха.',
      area_m2: 140,
      floors: 2,
      material: MaterialType.SIP,
      roof: RoofType.GABLE,
      style: StyleType.HIGH_TECH,
      price: 14500,
      model_3d_url: 'https://bosfor.s3/model/dom-skandi.glb',
      plan_pdf_url: 'https://bosfor.s3/plans/dom-skandi.pdf',
      images: [
        {
          id: 1,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/24e2295a-7c6c-4da4-942d-d7954cbfa106_2.jpg',
          isPreview: true,
          created_at: '2025-07-11T09:21:55.826Z',
          updatedAt: '2025-07-11T09:21:55.826Z',
        },
        {
          id: 2,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/f3203c79-43a8-4a53-bc8a-71ab40e71bd3_2.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:04:53.073Z',
          updatedAt: '2025-07-11T11:04:53.073Z',
        },
        {
          id: 3,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/38a765e7-ac84-40f5-b267-bbdfab5d08ed_3.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:05:27.860Z',
          updatedAt: '2025-07-11T11:05:27.860Z',
        },
        {
          id: 4,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/12eff8b3-5def-4b7c-8cf9-c27b01853b98_4.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:05:57.851Z',
          updatedAt: '2025-07-11T11:05:57.851Z',
        },
      ],
    },
    {
      title: 'Дом Хай-Тек',
      description:
        'Просторный одноэтажный дом, идеальный для семьи с детьми. Продуманная планировка и стильный внешний вид делают этот проект универсальным решением для жизни за городом. Дом сочетает в себе комфорт, безопасность и архитектурную выразительность.',
      area_m2: 200,
      floors: 1,
      material: MaterialType.SIP,
      roof: RoofType.GABLE,
      style: StyleType.HIGH_TECH,
      price: 17500,
      model_3d_url: 'https://bosfor.s3/model/dom-klassika.glb',
      plan_pdf_url: 'https://bosfor.s3/plans/dom-klassika.pdf',
      images: [
        {
          id: 5,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/e90ae6b5-c8f2-46b7-8b8b-ba1f301149e3_1.jpg',
          isPreview: true,
          created_at: '2025-07-11T11:10:22.875Z',
          updatedAt: '2025-07-11T11:10:22.875Z',
        },
        {
          id: 6,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/78c3d47f-b9ed-4d36-ac04-dc7500f7a28f_2.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:10:48.241Z',
          updatedAt: '2025-07-11T11:10:48.241Z',
        },
        {
          id: 7,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/89c4987a-fac2-4ed5-aea8-01bb2d204229_3.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:11:18.979Z',
          updatedAt: '2025-07-11T11:11:18.979Z',
        },
        {
          id: 8,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/88e52f2b-d1be-4318-9201-044a25b2bcbc_4.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:11:46.842Z',
          updatedAt: '2025-07-11T11:11:46.842Z',
        },
      ],
    },
    {
      title: 'Дом Хай-Тек',
      description:
        'Ультрасовременный дом в стиле хай-тек. Максимально лаконичный фасад, строгая геометрия и качественные материалы придают зданию футуристичный облик. Отличный выбор для тех, кто ценит инновации, технологии и стильную архитектуру.',
      area_m2: 160,
      floors: 1,
      material: MaterialType.SIP,
      roof: RoofType.HIP,
      style: StyleType.HIGH_TECH,
      price: 12300,
      model_3d_url: 'https://bosfor.s3/model/dom-hitech.glb',
      plan_pdf_url: 'https://bosfor.s3/plans/dom-hitech.pdf',
      images: [
        {
          id: 10,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/1c9c027c-c987-4252-bf68-88d3dc9b9d52_1111.jpg',
          isPreview: true,
          created_at: '2025-07-11T11:15:14.484Z',
          updatedAt: '2025-07-11T11:15:14.484Z',
        },
        {
          id: 11,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/638472cf-5192-463b-a791-3deb20ff6d26_444.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:15:36.784Z',
          updatedAt: '2025-07-11T11:15:36.784Z',
        },
        {
          id: 12,
          url: 'https://2cb66e80-2923-43a3-ad00-ccc9b9a3ce42.selstorage.ru/projects/030f4ff6-9778-4b9e-9702-f6bc7be8b183_333.jpg',
          isPreview: false,
          created_at: '2025-07-11T11:15:53.861Z',
          updatedAt: '2025-07-11T11:15:53.861Z',
        },
      ],
    },
  ];

  await projectRepo.save(projects);

  console.log('✅ Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed error', err);
  process.exit(1);
});
