/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'B7kOTqhedxeey25TI3kOp6PRDs82',
      fullName: 'Soumik Chaudhuri',
      emailAddress: 'soumik.chaudhuri2000@gmail.com',
      connections: ['3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      fullName: 'Harsh Gupta',
      emailAddress: 'harsh@gmail.com',
      connections: ['3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      fullName: 'Pavan Komishitty',
      emailAddress: 'pavan@gmail.com',
      connections: ['B7kOTqhedxeey25TI3kOp6PRDs82', '2'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      fullName: 'Bro Lee',
      emailAddress: 'bro@gmail.com',
      connections: ['B7kOTqhedxeey25TI3kOp6PRDs82', '2'],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase.firestore().collection('posts').add({
      postId: i,
      userId: 'B7kOTqhedxeey25TI3kOp6PRDs82',
      title: 'Mistakes to avoid in college',
      body: 'These are the mistakes that I feel should be avoided in college.',
      likes: 10,
      dislikes: 5,
      // comments: [
      //   {
      //     displayName: 'dali',
      //     comment: 'Love this place, looks like my animal farm!',
      //   },
      //   {
      //     displayName: 'orwell',
      //     comment: 'Would you mind if I used this picture?',
      //   },
      // ],
      dateCreated: Date.now(),
    });
  }
}
