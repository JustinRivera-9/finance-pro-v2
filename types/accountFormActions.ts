export type ContactForm = {
  type: "feedback" | "customerService" | "bug";
  message: string;
};

export type PasswordForm = { password: string };

export type PersonalInfoForm = { name: string; email: string };

export type PreferencesForm = {
  emailNotifications: boolean;
  darkMode: boolean;
};
