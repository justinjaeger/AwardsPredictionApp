import { DataStore } from 'aws-amplify';
import { User, UserRole } from '../../models';

const DATA = [
  { email: 'a@a.com', username: 'aaaaaa' },
  { email: 'b@b.com', username: 'bbbbbb' },
  { email: 'c@c.com', username: 'cccccc' },
];

export const createMockUsers = () => {
  DATA.forEach(async (user) => {
    const maybeUsers = await DataStore.query(User, (u) => u.email('eq', user.email));
    if (maybeUsers.length === 0) {
      const res = await DataStore.save(
        new User({
          email: user.email,
          role: UserRole.USER,
        }),
      );
      console.log('created user', res);
    } else {
      console.log('user already exists');
    }
  });
};

export const deleteMockUsers = () => {
  DATA.forEach(async (user) => {
    const maybeUsers = await DataStore.query(User, (u) => u.email('eq', user.email));
    if (maybeUsers.length > 0) {
      const res = await DataStore.delete(User, maybeUsers[0].id);
      console.log('deleted user', res);
    } else {
      console.log('user does not exist');
    }
  });
};
