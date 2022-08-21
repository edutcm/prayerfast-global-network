// import libs
import * as React from "react";

// import components
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

export const SocialShare = () => {
  // icons cannot be imported dynamically if using babel macros because
  // text string is needed at build time

  // @todo localize url
  const url = "https://prayerfast.org";

  return (
    <div className="mt-5">
      <ul className="flex gap-x-3">
        <li>
          <FacebookShareButton url={url}>
            <FontAwesomeIcon
              icon={brands("facebook")}
              className="h-6 w-6 text-emerald-100 hover:text-white"
              title="Facebook"
            />
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton url={url}>
            <FontAwesomeIcon
              icon={brands("twitter")}
              className="h-6 w-6  text-emerald-100 hover:text-white"
              title="Twitter"
            />
          </TwitterShareButton>
        </li>
        <li>
          <TelegramShareButton url={url}>
            <FontAwesomeIcon
              icon={brands("telegram")}
              className="h-6 w-6  text-emerald-100 hover:text-white"
              title="Telegram"
            />
          </TelegramShareButton>
        </li>
        <li>
          <WhatsappShareButton url={url}>
            <FontAwesomeIcon
              icon={brands("whatsapp")}
              className="h-6 w-6  text-emerald-100 hover:text-white"
              title="WhatsApp"
            />
          </WhatsappShareButton>
        </li>
        <li>
          <LinkedinShareButton url={url}>
            <FontAwesomeIcon
              icon={brands("linkedin")}
              className="h-6 w-6  text-emerald-100 hover:text-white"
              title="LinkedIn"
            />
          </LinkedinShareButton>
        </li>
        <li>
          <EmailShareButton url={url}>
            <FontAwesomeIcon
              icon={solid("envelope")}
              className="h-6 w-6  text-emerald-100 hover:text-white"
              title="Email"
            />
          </EmailShareButton>
        </li>
      </ul>
    </div>
  );
};
