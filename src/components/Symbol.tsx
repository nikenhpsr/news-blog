import facebookSVG from "../assets/facebook.svg";
import twitterSVG from "../assets/twitter.svg";
import instagramSVG from "../assets/instagram.svg";
import githubSVG from "../assets/github.svg";
import linkedinSVG from "../assets/linkedin.svg";

import "./Symbol.css";

export default function Symbol() {
  return (
    <div className="icon-grid">
      <img src={facebookSVG} alt="facebook-icon" className="icon" />
      <img src={twitterSVG} alt="twitter-icon" className="icon" />
      <img src={instagramSVG} alt="instagram-icon" className="icon" />
      <img src={githubSVG} alt="github-icon" className="icon" />
      <img src={linkedinSVG} alt="linkedin-icon" className="icon" />
    </div>
  );
}
