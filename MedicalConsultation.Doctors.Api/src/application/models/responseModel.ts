export class ResponseModel<T = any> {
  constructor(data: T, notifications: string[] = []) {
    this.data = data;
    this.notifications = notifications;
  }

  data: T;
  notifications: string[];
}