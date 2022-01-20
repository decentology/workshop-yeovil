import React, { useState, useEffect, useContext, FC } from "react";

type HyperverseContext = {
  width: number;
  isMobile: boolean;
  isDesktop: boolean;
  isAppleMobile: boolean;
};

const Context = React.createContext<HyperverseContext>({
  width: 0,
  isMobile: false,
  isDesktop: false,
  isAppleMobile: false,
});

function useDeviceDetect() {
  const context = useContext(Context);
  return context;
}

type ProviderProps = {};

const Provider: FC<ProviderProps> = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const onResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isMobile = width < 1024;
  const isDesktop = !isMobile;

  const isAppleMobile = !!navigator.platform.match(/iPhone|iPod|iPad/);

  return (
    <Context.Provider
      value={{
        width,
        isMobile,
        isDesktop,
        isAppleMobile,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Provider, useDeviceDetect };
