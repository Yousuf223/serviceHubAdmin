import * as yup from "yup";

// login
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const addClasses = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  classCode: yup.string().required("Class Code is required"),
});
export const addDoctorSehema = yup.object().shape({
  doctorName: yup.string().required('Doctor name is required'),
  startTime: yup.string().required('startTime are required'),
  endTime: yup.string().required('endTime are required'),
  category: yup.string().required('Specialistion is required'),
  fees: yup.number().required('Fees are required'),
  days: yup.array().min(1, 'At least one day is required'),
});
export const addReportSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  phoneNumber: yup.string().required('Phone Number are required'),
  patientAge: yup.string().required('Age are required'),
  comments: yup.string().required('Comments are required'),
  gender: yup.string().required("Gender is required"),
  reportIssuedDate: yup.string().required('Issue Date are required'),
  testCost: yup.string().required('Test Cost are required'),
});
export const addLabortorySehema = yup.object().shape({
  testName: yup.string().required('Test name is required'),
  testFees: yup.number().required('Fees are required'),
  description: yup.string().required('description is required'),
});

export const otpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const changeSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Previous Password is required"),
  password: yup
    .string()
    .notOneOf(
      [yup.ref("oldPassword")],
      "New Password must be different from Current Password"
    )
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const privacySchema = yup.object().shape({
  privacyPolicy: yup.string().required("Privacy policy required"),
});
export const refundSchema = yup.object().shape({
  refundPolicy: yup.string().required("Privacy policy required"),
});
export const termsSchema = yup.object().shape({
  termsAndConditions: yup.string().required("Terms and Condition required"),
});

export const aboutSchema = yup.object().shape({
  aboutApp: yup.string().required("About App required"),
});

export const categorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export const addsSchema = yup.object().shape({
  bussinessName: yup.string().required("Business Name is required"),
  startDate: yup.string().required("Start Date is required"),
  image: yup.mixed().required("Image Name is required"),
  endDate: yup.string().required("End Date is required"),
  primaryNmber: yup
    .string()
    .required("Primary Number is required")
    .matches(
      /^\+1\d{10}$/,
      "Primary Number must be a valid US phone number in the format"
    ),
  url: yup.string(),
  secondaryNmber: yup
    .string()
    .notRequired() // Mark as not required
    .matches(
      /^\+1\d{10}$/,
      { message: "Secondary Number must be a valid US phone number in the format", excludeEmptyString: true }
    ),
});
