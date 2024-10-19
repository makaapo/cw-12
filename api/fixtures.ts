import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const [user1, user2, user3] = await User.create(
    {
      email: 'malik@mail.local',
      password: '221096',
      role: 'user',
      displayName: 'Malik',
      avatar: 'fixtures/user.jpg',
      token: crypto.randomUUID(),
    },
    {
      email: 'makapo@mail.local',
      password: '12345',
      role: 'user',
      displayName: 'Makap',
      avatar: 'fixtures/user.jpg',
      token: crypto.randomUUID(),
    },
    {
      email: 'admin@mail.local',
      password: 'admin',
      role: 'admin',
      displayName: 'Admin',
      avatar: 'fixtures/admin.jpg',
      token: crypto.randomUUID(),
    },
  );

  await Photo.create(
    {
      title: 'Красивая ромашка',
      author: user2._id,
      image: 'fixtures/romashka.jpg',
    },
    {
      title: 'Луна',
      author: user2._id,
      image: 'fixtures/moon.jpg',
    },
    {
      title: 'Греция',
      author: user2._id,
      image: 'fixtures/greece.jpg',
    },
    {
      title: 'Осень',
      author: user2._id,
      image: 'fixtures/autumn.jpg',
    },
    {
      title: 'Море',
      author: user1._id,
      image: 'fixtures/sea.webp',
    },
    {
      title: 'Фонтан',
      author: user1._id,
      image: 'fixtures/fountain.jpg',
    },
    {
      title: 'Собачка',
      author: user3._id,
      image: 'fixtures/dog.jpg',
    },
    {
      title: 'Ретро автомобили',
      author: user3._id,
      image: 'fixtures/cars.jpg',
    },
    {
      title: 'Кошка',
      author: user3._id,
      image: 'fixtures/cat.jpg',
    },
  );

  await db.close();
};

void run();
