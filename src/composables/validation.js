import { computed, reactive } from "vue";

// import { z } from 'zod'

export const useValidateContact = (contact) => {
  const contactValidate = reactive({
    name: false,
    email: false,
    phone: false,
  });

  // const formSchema = z.object({
  //   name: z.string().min(2, {
  //     message: "Name must be at least 2 characters.",
  //   }),
  //   email: z.string().email({
  //     message: "Please enter a valid email address.",
  //   }),
  //   phone: z.string().regex(/^(\+\d{1,2}\s)?$$?\d{3}$$?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
  //     message: "Please enter a valid phone number.",
  //   }),
  // })

  const { name, email, phone } = contact;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/;
  // const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

  const nameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;

  const isValid = computed(() => {
    contactValidate.name = nameRegex.test(name);
    contactValidate.email = emailRegex.test(email);
    contactValidate.phone = phoneRegex.test(phone);
    return contactValidate;
  });

  return { contactValidate, isValid };
};
