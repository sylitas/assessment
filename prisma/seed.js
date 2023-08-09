import { ROLE, TABLE_NAME } from '../src/utils/const';
import { disconnect, upsert } from '../src/libraries/prismaClient';
import { md5Hash } from '../src/utils';

const createAdminUser = async () => {
  console.log('😎 Sylitas | Trigger create admin user');
  const adminUser = await upsert(TABLE_NAME.USERS, {
    where: { email: process.env.APP_ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.APP_ADMIN_EMAIL,
      password: md5Hash(process.env.APP_ADMIN_PASSWORD),
      firstname: 'admin',
      usersRoles: {
        create: {
          roles: { create: { name: ROLE.ADMIN } },
        },
      },
    },
  });
  console.log('😎 Sylitas | adminUser : ', adminUser);
};

const createCatagories = async () => {
  let categories = process.env.QUESTION_CATEGORIES.split(',');
  categories = await Promise.all(
    categories.map(async (category) => {
      const data = await upsert(TABLE_NAME.CATEGORIES, {
        where: { name: category },
        update: {},
        create: { name: category },
      });
      return data;
    })
  );
  console.log('😎 Sylitas | categories : ', categories);
};

(async () => {
  console.log('😎 Sylitas | Trigger seed data to database');
  await Promise.all([
    // Insert Admin user
    createAdminUser(),
    // Insert Question's catagories
    createCatagories(),
  ]);
})()
  .then(async () => {
    await disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await disconnect();
    process.exit(1);
  });
