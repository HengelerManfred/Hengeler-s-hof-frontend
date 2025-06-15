type Validator = (
  value: string,
  t: (key: string) => string
) => string | undefined;

export const validateName: Validator = (name, t) => {
  if (!name.trim()) {
    return t("errors.nameRequired");
  }
  return undefined;
};

export const validateEmail: Validator = (email, t) => {
  if (!email.trim()) {
    return t("errors.emailRequired");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    return t("errors.emailInvalid");
  }
  return undefined;
};

export const validatePhoneNumber: Validator = (phone, t) => {
  if (!phone.trim()) {
    return t("errors.phoneRequired");
  } else if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
    return t("errors.phoneInvalid");
  }
  return undefined;
};

export const validatePassword: Validator = (password, t) => {
  if (!password.trim()) {
    return t("errors.passwordRequired");
  } else if (password.length < 8) {
    return t("errors.passwordMinLength");
  }
  return undefined;
};
