import { forwardRef } from "react";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";

type CaptchaIframe = ReCAPTCHA;

export const ReCaptcha = forwardRef<CaptchaIframe>((_props, ref) => {

    const handleRecaptcha = async (token: string | null) => {
        Cookies.set('tokenCaptcha', token!)
    }

    return (
        <div className='captcha-container'>
            <div className="captcha">
                <ReCAPTCHA
                    ref={ref}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
                    onChange={handleRecaptcha}
                    theme='dark'
                />
            </div>
        </div>
    )
}
);