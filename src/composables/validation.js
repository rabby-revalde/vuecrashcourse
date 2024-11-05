import { computed, reactive } from "vue";

export const useValidateContact = (contact) => {
  const contactValidate = reactive({
    name: false,
    email: false,
    phone: false,
  });

  const { name, email, phone } = contact;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  const nameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;

  const isValid = computed(() => {
    contactValidate.name = nameRegex.test(name);
    contactValidate.email = emailRegex.test(email);
    contactValidate.phone = phoneRegex.test(phone);
    return contactValidate;
  });

  return { contactValidate, isValid };
};
