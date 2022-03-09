import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../common/Dropdown/Dropdown";
import { Menu } from "@headlessui/react";
import { NameValue } from "../../types/NameValue";
import { useAuth0 } from "@auth0/auth0-react";

const dropDownButtons: NameValue[] = [{ name: "logout", value: "Logout" }];

export default function Header() {
  const { logout } = useAuth0();
  const onMenuItemClicked = (dropDownButtonName: string) => {
    if (dropDownButtonName === "logout") {
      console.info("Sign out");
      logout({ returnTo: `${window.location.origin}/login` });
      return;
    }
  };

  const renderMenuContent = () => {
    return (
      <Menu.Button class="shrink-0 w-12 h-12 grid place-items-center">
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
        <Dropdown
          menuContent={renderMenuContent()}
          dropDownButtons={dropDownButtons}
          onMenuItemClicked={onMenuItemClicked}
        />
      </div>
    </div>
  );
}
