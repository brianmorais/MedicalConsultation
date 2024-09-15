import { PatientModel } from "../models/patientModel";

export class PatientValidator {
  static validatePost(request: PatientModel): string[] {
    return this.validateGeneralInformations(request);
  }

  static validatePut(request: PatientModel): string[] {
    const generalNotifications = this.validateGeneralInformations(request);
    if (!request.id) {
      generalNotifications.push('id is required');
    }
    return generalNotifications;
  }

  private static validateGeneralInformations(request: PatientModel): string[] {
    const notifications: string[] = [];
    if (!request.firstName) {
      notifications.push('firstName is required');
    }
    if (!request.lastName) {
      notifications.push('lastName is required');
    }
    if (!this.emailIsValid(request.email)) {
      notifications.push('email required and the format must be correct');
    }
    if (!request.phoneNumber) {
      notifications.push('phoneNumber is required');
    }
    if (!request.document) {
      notifications.push('document is required');
    }
    return notifications;
  }

  private static emailIsValid(email: string): Boolean {
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (email && regex.test(email)) {
      return true;
    }
    return false;
  }
}