export const samplechats = [
  {
    avatar: [
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    ],
    name: "John Smith",
    _id: "1",
    groupChat: false,
    members: ["1"],
  },
  {
    avatar: [
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
    ],
    name: "Methew Parker",
    _id: "2",
    groupChat: true,
    members: ["2", "3"],
  },
  {
    avatar: [
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    ],
    name: "Han Lue",
    _id: "4",
    groupChat: false,
    members: ["1", "5"],
  },
];

// FOR USERS
export const sampleUsers = [
  {
    avatar: [
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    ],
    name: "John Smith",
    _id: "1",
  },
  {
    avatar: [
      "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
    ],
    name: "Methew Parker",
    _id: "2",
  },
  {
    avatar: [
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    ],
    name: "Han Lue",
    _id: "3",
  },
  {
    avatar: [
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    ],
    name: "Dominic Torreto",
    _id: "4",
  },
];

// FOR NOTI
export const sampleNotifications = [
  {
    sender: {
      avatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      name: "Jhon Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      name: "Sol Doe",
    },
    _id: "2",
  },
  {
    sender: {
      avatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      name: "Jhon Boyd",
    },
    _id: "3",
  },
  {
    sender: {
      avatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      name: "Han Lue",
    },
    _id: "4",
  },
];

// FOR SAMPLE MESSAGES
export const sampleMessage = [
  {
    content: "Hey Amish, How you doing?",
    _id: "1",
    sender: {
      _id: "user._id",
      name: "John Smith",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "dasdaddad",
        url: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      },
    ],
    content: "",
    _id: "2",
    sender: {
      _id: "dasdad",
      name: "Amish Pithva",
    },
    chat: "chatId",
    createdAt: "2024-02-12T12:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "Jhone Doe",
      avatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 10,
    },
    {
      name: "Alice Reyy",
      avatar:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      _id: "2",
      username: "alice_reyy",
      friends: 10,
      groups: 20,
    },
  ],

  chats: [
    {
      _id: "1",
      avatar: [
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      ],
      name: "Jhone Doe",
      groupChat: false,
      members: [{_id: '1', avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'}, {_id: '2', avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'}],
      totalMembers: 2,
      totalMessages: 100,
      creator: {
        name: "Jhon Boyd",
        avatar:
          "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      },
    },
    {
      _id: "2",
      avatar: [
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
      ],
      name: "Rocky Jojo",
      groupChat: true,
      members: [{_id: '1', avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'}, {_id: '2', avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'}],
      totalMembers: 10,
      totalMessages: 300,
      creator: {
        name: "Tony Sharma",
        avatar:
          "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
      },
    },
  ],
};
