import ApiServices from '../../services/graphql';

const DATA = [
  { email: 'a@a.com', username: 'aaaaaa' },
  { email: 'b@b.com', username: 'bbbbbb' },
  { email: 'c@c.com', username: 'cccccc' },
];

export const createMockUsers = () => {
  DATA.forEach(async (user) => {
    const { data } = await ApiServices.createUser(user.email);
    if (!data) return;
    console.log('created user', data);
  });
};

export const deleteMockUsers = () => {
  DATA.forEach(async (user) => {
    const { data: maybeUsers } = await ApiServices.getUserByEmail(user.email);
    if (!maybeUsers?.listUsers) return;
    if (maybeUsers.listUsers.items.length > 0) {
      const user = maybeUsers.listUsers.items[0];
      if (!user) {
        return console.error('deleteMockUsers error');
      }
      const res = await ApiServices.deleteUser(user.id);
      console.log('deleted user', res);
    } else {
      console.log('user does not exist');
    }
  });
};
