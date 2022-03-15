import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div class="grid place-items-center">
      <div>The page you were looking for was not found</div>
      <div class="my-6">
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  );
};

export default NotFound;
