import React, {useState, useEffect, useContext} from 'react';

const Context = React.createContext({});

function useDeviceDetect() {
  const context = useContext(Context);
  return context;
}

function Provider(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const onResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
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
        isAppleMobile
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Provider,
  useDeviceDetect
};