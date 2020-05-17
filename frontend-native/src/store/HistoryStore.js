import { createContext } from 'react'
import { decorate, observable } from 'mobx'

class HistoryStore {
  history = [];
};

decorate(HistoryStore, {
  history: observable
});

export default createContext(new HistoryStore());