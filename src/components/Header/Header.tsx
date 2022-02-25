import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <div class="flex items-center justify-center w-full bg-gradient-to-r from-header-start to-black">
      <div class="flex items-center justify-between shrink-0 max-w-screen-xl w-11/12 ">
        <Link to="/">
          <img
            alt="Ultra Logo"
            width="165px"
            height="72px"
            src="/images/logo.png"
            class="pt-2 cursor-pointer"
          ></img>
        </Link>
        <div class="shrink-0 w-12 h-12 grid place-items-center">
          <FontAwesomeIcon icon="gear" />
        </div>
      </div>
    </div>
  );
}
