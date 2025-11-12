import { useEffect } from "react"

export function useAddDisableScrollClassOnBody() {
  useEffect(() => {
    document
      .body
      .classList
      .add(`disable-scroll`)
    
    return () => {
      document
        .body
        .classList
        .remove(`disable-scroll`)
    }
  }, []) 
}