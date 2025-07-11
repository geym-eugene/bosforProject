import { DataSource } from 'typeorm';
import { User, UserRole } from '../user/entity';
import { Favorite } from '../favorite/entity';
import { Project } from '../project/entity';
import { ProjectImage } from '../project-images/entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Favorite, Project, ProjectImage],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  await AppDataSource.query(
    'TRUNCATE TABLE "favorites", "project_images", "projects", "users" RESTART IDENTITY CASCADE',
  );
  const admin = userRepo.create({
    username: 'superadmin',
    email: 'admin@bosfor.com',
    hashedPassword: 'admin123',
    role: UserRole.ADMIN,
  });

  await userRepo.save(admin);
  console.log('✅ Админ успешно создан');

  await AppDataSource.destroy();
}

seed().catch(async (err) => {
  console.error('❌ Ошибка сидирования:', err);
  await AppDataSource.destroy();
});
