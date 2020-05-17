import { createContext } from 'react'
import { decorate, observable } from 'mobx'

//this is the store for showing modal, we store the id of the movie we are getting more info about here
class ModalStatus {
  show: ""
}

decorate(ModalStatus, {
  show: observable
})

export default createContext(new ModalStatus())
