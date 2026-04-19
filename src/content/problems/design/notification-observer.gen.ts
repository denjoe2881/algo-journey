import { defineTests } from '../../_test-utils';

export default defineTests('notification-observer', (t) => {
  t.visible('basic-publish-subscribe', {
    operations: [
      ['NotificationService'],
      ['addObserver', 'new EmailNotifier("john@example.com")'],
      ['sendNotification', 'System reboot'],
      ['addObserver', 'new SmsNotifier("555-0100")'],
      ['sendNotification', 'Update ready'],
    ],
    expected: [
      null,
      null,
      '[Email to john@example.com: System reboot]',
      null,
      '[Email to john@example.com: Update ready, SMS to 555-0100: Update ready]',
    ],
  });

  t.visible('app-notifier', {
    operations: [
      ['NotificationService'],
      ['addObserver', 'new AppNotifier("user123")'],
      ['sendNotification', 'Hello!'],
    ],
    expected: [null, null, '[App notification to user123: Hello!]'],
  });

  t.visible('no-observers', {
    operations: [
      ['NotificationService'],
      ['sendNotification', 'broadcast'],
    ],
    expected: [null, '[]'],
  });

  t.hidden('multiple-types', {
    operations: [
      ['NotificationService'],
      ['addObserver', 'new EmailNotifier("a@x.com")'],
      ['addObserver', 'new SmsNotifier("999")'],
      ['addObserver', 'new AppNotifier("alice")'],
      ['sendNotification', 'Hi'],
    ],
    expected: [
      null,
      null,
      null,
      null,
      '[Email to a@x.com: Hi, SMS to 999: Hi, App notification to alice: Hi]',
    ],
  });
});
