import { useRouter } from "next/router";
import { captureScroll } from "@/helpers"
import { useScrollTrigger } from "@mui/material";

interface Props {
    window?: () => Window;
}

export const useNavbar = (props: Props) => {

    const { navbarStyle } = captureScroll();

    const { asPath } = useRouter();

    const { window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return {
        navbarStyle,
        trigger,
        asPath
    }
}
