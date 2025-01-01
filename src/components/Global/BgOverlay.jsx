import React from "react";

function BgOverlay({close}) {
  return <div className={"fixed inset-0 bg-black/30 z-40"} onClick={close}></div>;
}

export default BgOverlay;
