import React from "react";

function Footer() {
  return (
    <div className="text-sm mt-4 md:mt-0 bg-(--dark-background) text-(--text-color-main) p-4 flex items-center justify-center">
      © {new Date().getFullYear()} DevPortfolio. All rights reserved.
    </div>
  );
}

export default Footer;
