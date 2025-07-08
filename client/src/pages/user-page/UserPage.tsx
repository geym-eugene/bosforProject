import { useAppSelector } from "@/shared/library/hooks";
import React from "react";

function UserPage() {
  const user = useAppSelector((state) => state.user);
  return <div>UserPage</div>;
}

export default UserPage;
