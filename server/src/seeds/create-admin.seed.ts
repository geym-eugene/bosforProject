import { DataSource } from 'typeorm';
import { User, UserRole } from '../user/entity';
import * as bcrypt from 'bcrypt';

// Создаём DataSource вручную для seed-скрипта
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: false, // чтобы не дропнуть таблицы случайно
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOne({
    where: { email: 'admin@bosfor.com' },
  });
  if (existing) {
    console.log('⚠️ Админ уже существует');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = userRepo.create({
    username: 'superadmin',
    email: 'admin@bosfor.com',
    hashedPassword,
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
