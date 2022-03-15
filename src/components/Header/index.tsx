import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../common/Dropdown/Dropdown";
import { Menu } from "@headlessui/react";
import { NameValue } from "../../types/NameValue";
import { useAuth0 } from "@auth0/auth0-react";
import { menuLinks } from "../../constants/menuLinks";

const isRunningOnServer = typeof window === "undefined";

const dropDownButtons: NameValue[] = [{ name: "logout", value: "Logout" }];

export default function Header() {
  const { logout, isAuthenticated } = useAuth0();
  const onMenuItemClicked = (dropDownButtonName: string) => {
    if (dropDownButtonName === "logout") {
      console.info("Sign out");
      logout({ returnTo: `${window.location.origin}/login` });
      return;
    }
  };

  const getPathnameWithSearch = () => {
    if (!isRunningOnServer) {
      return window?.location.pathname + window?.location.search;
    }
    return "";
  };

  const renderLinksDesktop = () => {
    const linkClass =
      "hover-hover:hover:text-link-hover active:text-link-hover ";

    return (
      <ul class="flex justify-start flex-wrap text-base mx-10">
        {menuLinks.map((link) => {
          return (
            <li key={link.key} class="mx-2">
              <Link
                to={link.link}
                class={
                  linkClass +
                  `${
                    getPathnameWithSearch() === link.link
                      ? "text-link-hover"
                      : ""
                  }`
                }
              >
                {link.key}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderMenuContent = () => {
    return (
      <Menu.Button class="shrink-0 w-12 h-12 grid place-items-center hover-hover:hover:text-link-hover active:text-link-hover">
        <FontAwesomeIcon icon="gear" />
      </Menu.Button>
    );
  };

  return (
    <div class="flex items-center justify-center w-full bg-gradient-to-r from-header-start to-black">
      <div class="flex items-center justify-between shrink-0 max-w-screen-xl w-11/12">
        <Link to="/">
          <img
            alt="Ultra Logo"
            width="165px"
            height="72px"
            src="/images/logo.png"
            class="pt-2 cursor-pointer"
          ></img>
        </Link>
        <div class="flex-1 hidden md:block">{renderLinksDesktop()}</div>
        {isAuthenticated && (
          <Dropdown
            menuContent={renderMenuContent()}
            dropDownButtons={dropDownButtons}
            onMenuItemClicked={onMenuItemClicked}
          />
        )}
      </div>
    </div>
  );
}
