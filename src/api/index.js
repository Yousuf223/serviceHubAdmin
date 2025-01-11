import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

// Auth
API.loginUser = (data) => {
  return API.post("/web/auth/login", data);
};
API.countUser = () => {
  return API.get("/admin/user/count");
};

API.getPostById = (param)=>{
  return API.get(`/getAllUserPosts/${param}`)
}
API.sendOtp = (data) => {
  return API.post("/admin/auth/verify-reset-password-otp", data);
};
API.resendOtp = (data) => {
  return API.post("/admin/auth/reset-password/resend-otp", data);
};

API.forgotPassword = (data)=>{
  return API.post("/admin/auth/reset-password",data)
}

API.changePassword = (data) => {
  return API.patch("/admin/auth/change-password", data);
};

API.resetPassword = (data) => {
  return API.post("/admin/auth/verify-reset-password-token", data)
}

// logout
API.logOut = (data)=>{
  return API.post("/api/admin/logout",data)
}

// Admin
API.adminProfile = ()=>{
  return API.get("/api/admin/me")
}

// userStatus
API.userStatus = (data)=>{
  return API.patch(`/admin/user/block-unblock`, data)
}

// policies

// privacy 

API.getPrivacy = ()=>{
  return API.get("/getUsersPrivacyPolicy")
}

API.addPrivacy = (data)=>{
  return API.post("/createUserPrivacyPolicy", data)
}

// T&C

API.getTerms = ()=>{
  return API.get("/getUsersTermsAndCondition")
}

API.addTerms = (data)=>{
  return API.post("/createUserTermsAndCondition", data)
}

API.getRefundRequest = ()=>{
  return API.get("/getUserRefundRequest")
}
// About App

API.getAbout = ()=>{
  return API.get("/getUsersAboutApp")
}

API.addAbout = (data)=>{
  return API.post("/createUserAboutApp", data)
}
API.updateAbout = ( id,data ) => {
  return API.put(`/updateUserAboutApp/${id}`,  data );
};
// restaurants
API.getRestaurant = ()=>{
  return API.get("/api/business/admin")
}

API.changeStatus = (data)=>{
  return API.patch("/api/business/block_business/admin", data)
}


API.getClass = () => {
  return API.get(`/web/educationist/get-my-classes`);
};
API.addClass=(data)=>{
  return API.post('/web/educationist/create-class',data)
}
API.addMemberClass=(data)=>{
  return API.post('/web/educationist/add-member-to-class',data)
}
// users
API.getUsers = () => {
  return API.get("/web/educationist/fetch-members-to-add");
};
API.getMembers = () => {
  return API.get("/web/educationist/view-my-members");
};
API.addMember=(data) => {
  return API.post('/web/educationist/add-member',data)
}
API.getAdds = () => {
  return API.get("/admin/adds");
};
API.getAddsDetail = (id) => {
  return API.get(`/admin/adds/detail/${id}`);
};
API.deleteAdds = (id) => {
  return API.delete(`/admin/adds/${id}`);
};
API.updateAdds = (data,id) => {
  return API.patch(`/admin/adds/${id}`,data);
};
API.getAppSettings = () => {
  return API.get("/admin/app-settings");
};

API.updateTermsAndCondition  = ( id ,data ) => {
  return API.put(`/updateUserTermsAndCondition/${id}`, data);
};

API.createTermsAndCondition  = (data) => {
  return API.post(`/createUserTermsAndCondition`, data);
};
API.getTermsAndConditionHandler = () => {
  return API.get("/getHandlersTermsAndCondition");
};

API.updateTermsAndConditionHandler = ( id,data ) => {
  return API.put(`/updateHandlerTermsAndCondition/${id}`,  data );
};

API.createTermsAndConditionHandler = (data) => {
  return API.patch(`/admin/app-settings`, data);
};


API.getPrivacyPolicy = () => {
  return API.get("/getUsersPrivacyPolicy");
};

API.updatePrivacyPolicy = ( id ,data ) => {
  return API.put(`/updateUserPrivacyPolicy/${id}`, data);
};

API.createPrivacyPolicy = (data) => {
  return API.patch(`/admin/app-settings`, data);
};

API.contactUs = (data) => {
  return API.post("contact", data);
};

API.getCardData = (param, bool) => {
  return API.get(`entities/${param}?status=${bool}`);
};


API.getNotification = () => {
  return API.get(`/admin/notification`);
};
API.getFeedback = () => {
  return API.get(`/admin/feedbacks`);
};
API.getUserGraph = () => {
  return API.get(`/admin/user/graph`);
};
API.getHorses = () => {
  return API.get(`/admin/user/horses`);
};


API.createRefundPolicyHandler = (data) => {
  return API.post(`/createHandlerRefundPolicy`, data);
};
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
console.log('tokentokentoken',token)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(
      error?.message,'------erreor'
    );
    if (
      error?.response?.error === "Request failed with status code 404"
    ) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export { API };
