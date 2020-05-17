import { createContext } from 'react'
import { decorate, observable } from 'mobx'

//here we store whether advanced view is toggled on or off
class AdvancedViewStatus {
  toggled = false;
  option = "yearCount";
}

decorate(AdvancedViewStatus, {
  toggled: observable,
  option: observable
})

export default createContext(new AdvancedViewStatus())
