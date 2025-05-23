// apps/web/lib/auth.ts
import api from "./api";

interface SignupData {
  email: string;
  name?: string;
  password: string;
  ref?: string;
}

export const signup = async (data: SignupData) => {
  const params = data.ref ? { ref: data.ref } : {};

  const response = await api.post(
    "/user/register",
    {
      email: data.email,
      name: data.name,
      password: data.password,
    },
    { params }
  );

  return response.data;
};

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post("/user/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/user/logout");
  return response.data;
};


export const getAllReferrals = async (referralCode: string) => {
  const response = await api.get(`/user/referrals?code=${referralCode}`);
  return response.data;
};
