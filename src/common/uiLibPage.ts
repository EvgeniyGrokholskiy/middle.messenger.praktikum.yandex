export const uiLibPage = {
  loginBlocks: {
    emptyLogins: [
      {
        error: 'true',
        name: 'login',
        for: 'login',
        type: 'text',
        placeholder: 'Логин',
        value: '',
        errorText: 'Неверный логин',
      },
      {
        error: '',
        name: 'password',
        for: 'password',
        type: 'password',
        placeholder: 'Пароль',
        value: '',
        errorText: 'Неверный пароль',
      },
    ],
    secondVariant: [
      {
        error: 'true',
        name: 'login',
        for: 'login1',
        type: 'text',
        placeholder: 'Логин',
        value: 'ivanivanov@74.ru',
        errorText: 'Неверный логин',
      },
      {
        error: '',
        name: 'password',
        for: 'password1',
        type: 'password',
        placeholder: 'Пароль',
        value: '',
        errorText: 'Неверный пароль',
      },
    ],
    thirdVariant: [
      {
        error: 'true',
        name: 'login',
        for: 'login2',
        type: 'text',
        placeholder: 'Логин',
        value: 'ivanivanov@74.ru',
        errorText: 'Неверный логин',
      },
      {
        error: '',
        name: 'password',
        for: 'password2',
        type: 'password',
        placeholder: 'Пароль',
        value: '123456789',
        errorText: 'Неверный пароль',
      },
    ],
    forthVariant: [
      {
        error: 'true',
        name: 'login',
        for: 'login3',
        type: 'text',
        placeholder: 'Логин',
        value: 'ivanivanov@74.ru',
        errorText: '',
      },
      {
        error: '',
        name: 'password',
        for: 'password3',
        type: 'password',
        placeholder: 'Пароль',
        value: '••••••••••••',
        errorText: 'Неверный пароль',
      },
    ]
  },
  chatItem: [
    {
      avatarUrl: '',
      chatName: 'Андрей',
      lastMessage: 'Изображение',
      isLastMessageOutgoing: '',
      lastMessageTime: '10:49',
      unreadMessages: 2,
      selected: '',
    },
    {
      avatarUrl: '',
      chatName: 'Киноклуб',
      lastMessage: 'стикер',
      isLastMessageOutgoing: 'outgoing',
      lastMessageTime: '12:00',
      unreadMessages: 0,
      selected: '',
    },
    {
      avatarUrl: '',
      chatName: 'Вадим',
      lastMessage: 'Круто!',
      isLastMessageOutgoing: 'outgoing',
      lastMessageTime: 'Пт',
      unreadMessages: 0,
      selected: 'chat-item_selected',
    },
  ],
  userProfileBlock: [
    {
      header: 'Почта',
      disabled: 'true',
      id: 'email',
      name: 'email',
      type: 'text',
      value: 'pochta@yandex.ru'
    },
    {
      header: 'Старый пароль',
      id: 'oldPassword',
      name: 'oldPassword',
      type: 'password',
      value: '1111111'
    },
    {
      header: 'Повторите новый пароль',
      id: 'repeatNewPassword',
      name: 'repeatNewPassword',
      type: 'password',
      value: '123456789',
      class: 'last'
    },
  ],
}
