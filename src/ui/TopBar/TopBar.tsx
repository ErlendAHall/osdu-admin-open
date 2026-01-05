import { Button, TopBar as EdsTopBar, Icon } from "@equinor/eds-core-react";
import { new_label, gear } from "@equinor/eds-icons";
import productIcon from "../../assets/product-icon.png";
import "./TopBar.css";

export function TopBar() {
    return (
        <EdsTopBar sticky>
            <EdsTopBar.Header>
                <img
                    src={productIcon}
                    width="50"
                    height="50"
                    alt="product icon"
                ></img>
                <span>OSDU Admin</span>
            </EdsTopBar.Header>
            <EdsTopBar.CustomContent>
                <menu className="top-bar-actions">
                    <Button as="a" variant="ghost_icon" href="#">
                        <Icon data={new_label} />
                    </Button>
                    <Button variant="ghost_icon" as="a" href="#">
                        <Icon data={gear} />
                    </Button>
                </menu>
            </EdsTopBar.CustomContent>
        </EdsTopBar>
    );
}
