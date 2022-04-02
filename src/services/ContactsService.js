let contacts = []

const list = () => Promise.resolve([])

const create = (contact) => {
  if (contacts.some(c => contact.email === c.email)) {
    return Promise.reject({
      response: {
        data: {
          message: "Validation Error",
          errors: {
            email: "email is duplicated"
          }
        }
      }
    })
  } else {
    contact.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    contacts.push(contact)
    return Promise.resolve(contact)
  }
}

export default {
  list,
  create
}