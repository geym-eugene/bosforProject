import UserAdmin from "@/entities/user/ui/UserAdmin";
import UserUser from "@/entities/user/ui/UserUser";
import { useAppSelector } from "@/shared/library/hooks";
import React from "react";

function UserPage() {
  const user = useAppSelector((state) => state.user.user.role);
  if (user === 'user') return <UserUser/> 
  return <UserAdmin/>
}

export default UserPage;
