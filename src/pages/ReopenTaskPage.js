import { useParams } from "react-router-dom";
import ReopenTask from "../components/ReopenTask";

function ReopenTaskPage() {
  const { taskId } = useParams(); // <- get taskId from URL
  return (
    <div>
      <ReopenTask taskId={taskId} />  
    </div>
  );
}

export default ReopenTaskPage;