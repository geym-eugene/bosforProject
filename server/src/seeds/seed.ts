import { DataSource } from 'typeorm';
import { MaterialType, Project, RoofType, StyleType } from '../project/entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Project],
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
      title: 'Дом Сканди',
      description: 'Современный дом в скандинавском стиле',
      area_m2: 140,
      floors: 2,
      material: MaterialType.WOOD,
      roof: RoofType.GABLE,
      style: StyleType.SCANDI,
      price: 14500000,
      image_preview:
        'https://www.ccnova.ru/upload/resize_cache/iblock/8ef/8e1rimlj3ny6slsmc81gyxr3d12d7szp/800_500_0/310-Novatsiya_vid-1_variant-1.jpg',
      model_3d_url: 'https://bosfor.s3/model/dom-skandi.glb',
      plan_pdf_url: 'https://bosfor.s3/plans/dom-skandi.pdf',
    },
    {
      title: 'Классический дом',
      description: 'Просторный кирпичный дом для семьи',
      area_m2: 200,
      floors: 2,
      material: MaterialType.BRICK,
      roof: RoofType.HIP,
      style: StyleType.MINIMALISM,
      price: 17500000,
      image_preview:
        'https://www.ccnova.ru/upload/resize_cache/iblock/8ef/8e1rimlj3ny6slsmc81gyxr3d12d7szp/800_500_0/310-Novatsiya_vid-1_variant-1.jpg',
      model_3d_url: 'https://bosfor.s3/model/dom-klassika.glb',
      plan_pdf_url: 'https://bosfor.s3/plans/dom-klassika.pdf',
    },
    {
      title: 'Дом Хай-Тек',
      description: 'Современный стиль хай-тек с плоской крышей',
      area_m2: 120,
      floors: 1,
      material: MaterialType.SIP,
      roof: RoofType.FLAT,
      style: StyleType.HIGH_TECH,
      price: 12300000,
      image_preview: 'https://domclick.ru/images/project/modern.jpg',
      model_3d_url: 'https://bosfor.s3/model/dom-hitech.glb',
      plan_pdf_url: 'https://bosfor.s3/plans/dom-hitech.pdf',
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
