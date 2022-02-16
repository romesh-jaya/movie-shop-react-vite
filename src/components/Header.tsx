import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div class="flex items-center justify-center w-full bg-gradient-to-r from-header-start to-black">
      <div class="flex items-center max-w-screen-xl w-11/12">
        <Link to="/">
          <img
            alt="Ultra Logo"
            width="165px"
            height="72px"
            src="/public/images/logo.png"
            class="pt-2 cursor-pointer"
          ></img>
        </Link>
      </div>
    </div>
  );
}
