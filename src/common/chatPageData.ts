import addIcon from '../img/addUserIcon.svg';
import deleteIcon from '../img/deleteUserIcon.svg';

export type TChatPage = typeof chatPageData;

export const chatPageData = {
  popupData: {
    addChat: {
      addUser: {
        imageSrc: addIcon,
        buttonText: 'Добавить пользователя',
        altText: 'plus in a circle',
      },
      deleteUser: {
        imageSrc: deleteIcon,
        buttonText: 'Удалить пользователя',
        altText: 'cross in a circle',
      },
    },
    addUser: {
      addUser: {
        headerText: 'Добавить пользователя',
        buttonText: 'Добавить',
      },
      deleteUser: {
        headerText: 'Удалить пользователя',
        buttonText: 'Удалить',
      },
    },
  },
  chatList: [
    {
      id: 0,
      avatar: '',
      title: 'Загрузка...',
      isLastMessageOutgoing: '',
      created_by: 0,
      unread_count: 10,
      last_message: {
        user: {
          avatar: '',
          email: '',
          first_name: '',
          login: '',
          phone: '',
          second_name: '',
        },
        time: '1212',
        content: 'dasfasdfasd',
      },
    },
  ],
};
