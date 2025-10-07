import getCurrentUserData from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUserData();
  console.log(user);
  if (user && user.isAdmin) {
    redirect("/admin");
  } else {
    redirect("/home");
  }
}
