import { auth } from "@/lib/auth";

export const seedUsers = async () => {
  const users = [
    {
      name: "John Doe",
      email: "john@admin.com",
      password: "test1234",
    },
  ];

  for (const user of users) {
    await auth.api.signUpEmail({
      body: user,
    });
  }
};
