import { createContext } from 'react'
import { decorate, observable } from 'mobx'

//Here we store the different searches, filters and sorts the users can do on the website
class QueryVariables {
  search = "" //the input of the user in the search field
  sort = {
    columnName: "originalTitle", //the field data to sort by
    order:"asc" //order to sort by, asc/desc
  }
  year = {
    from: "1900",
    to: "2050"
  }
  genres = ""
}

decorate(QueryVariables, {
  search: observable,
  sort: observable,
  year: observable,
  genres: observable
})

export default createContext(new QueryVariables())
