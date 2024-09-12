export class AuthValidator {
  static validateLogin(user: string, password: string): string[] {
    const notifications: string[] = [];
    if (!user) {
      notifications.push('user is required');
    }
    if (!password) {
      notifications.push('password is required');
    }
    return notifications;
  }
}