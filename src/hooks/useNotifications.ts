import { Store } from 'react-notifications-component';

interface NotificationType {
  type?: 'success' | 'danger' | 'info' | 'default' | 'warning';
  duration?: number;
}

const typesNotification: NotificationType[] = [
  {
    type: 'default',
  },
  {
    type: 'success',
  },
  {
    type: 'danger',
  },
  {
    type: 'warning',
  },
  {
    type: 'info',
  },
];

export default function useNotification(message: string, type?: string, duration?: number) {
  let notificationType = typesNotification.find((notification, i) => notification.type === type);

  Store.addNotification({
    message: message,
    type: notificationType ? notificationType.type : "default",
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__bounceInRight'],
    animationOut: ['animate__animated', 'animate__bounceOutLeft'],
    dismiss: {
      duration: duration ?? 5000,
      onScreen: true,
    },
  });
}
