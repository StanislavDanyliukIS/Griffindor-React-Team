import "./Footer.scss"
import {NavLink} from "react-router-dom";

const Footer = () => {
  return(
      <div className={"footer  bg-light px-5 pb-1 pt-5"}>
          <div className={"container-xl"}>
              <div className={"footer-text text-muted"}>
                  Copyright © 2022 Tabler. All rights reserved.
              </div>
              <NavLink className={"footer-link text-muted pe-auto text-decoration-none"} to={"/documentation"}>
                  Documentation
              </NavLink>
          </div>
      </div>
  )
}

export default Footer;