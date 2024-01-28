import React from "react";
import { createPortal } from 'react-dom';


const usePopup = () =>{


    const showPopup = (children) =>{
        return createPortal(children, document.getElementById("backdrop")) 
                
    }

    
return showPopup;


}

export default usePopup;