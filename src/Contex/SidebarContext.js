import {useState, createContext} from 'react'

export const SideBarContext = createContext();

const SidebarContext = ({children}) => {

    const [Close, setClose] = useState(false);

  const handleSidebarView = () => {
    setClose(!Close);
  };



  return (<>
  
  <SideBarContext.Provider value={{ Close, handleSidebarView}}>
      {children}

    </SideBarContext.Provider>
  
  </>
  )
}

export default SidebarContext