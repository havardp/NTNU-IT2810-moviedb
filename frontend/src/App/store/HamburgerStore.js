import { createContext } from 'react'
import { decorate, observable } from 'mobx'

//this is the store for if hamburgermenu is shown or not
class HamburgerStatus {
  show = false;
}

decorate(HamburgerStatus, {
  show: observable
})

export default createContext(new HamburgerStatus())
