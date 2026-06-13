import React from "react";
import { useParams } from "react-router-dom";
import UserTasks from "../components/UserTasks";

function UserTasksPage() {

  const { userId } = useParams();

  return (
    <div>
      <UserTasks userId={userId} />
    </div>
  );
}

export default UserTasksPage;