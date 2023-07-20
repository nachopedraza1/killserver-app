import { captureScroll } from "@/helpers"
import { useScrollTrigger } from "@mui/material";

interface Props {
    window?: () => Window;
}

export const useNavbar = (props: Props) => {

    const { navbarStyle } = captureScroll();

    const { window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return {
        navbarStyle,
        trigger
    }
}
