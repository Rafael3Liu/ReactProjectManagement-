export const messageData = [
  {
    id: 'success',
    txt: 'You are successfully logged in',
    time: 4000,
    label: 'login',
  },
  {
    id: 'error',
    txt: 'You have entered an invalid username or password',
    time: 2000,
    label: 'Request failed with status code 401',
  },
  {
    id: 'error',
    txt: 'You are now logged out',
    time: 2000,
    label: 'logOut',
  },
  {
    id: 'error',
    txt: 'Login session expired',
    time: 2000,
    label: 'timeOut',
  },
  {
    id: 'success',
    txt: 'Deleted Success',
    time: 2000,
    label: 'delete-success',
  },
  {
    id: 'error',
    txt: 'Deleted Unsuccess',
    time: 2000,
    label: 'delete-unsuccess',
  },
  {
    id: 'success',
    txt: 'Export Success',
    time: 2000,
    label: 'export-success',
  },
  {
    id: 'success',
    txt: 'Import Success',
    time: 2000,
    label: 'import-success',
  },
  {
    id: 'success',
    txt: 'New Product Added',
    time: 2000,
    label: 'createdNew',
  },
  {
    id: 'error',
    txt: 'An error occurred. Failed to add new product',
    time: 2000,
    label: 'notCreatedNew',
  },
  {
    id: 'success',
    txt: 'Product change was successful',
    time: 2000,
    label: 'updated',
  },
  {
    id: 'error',
    txt: 'An error occurred. Failed to update product',
    time: 2000,
    label: 'notUpdated',
  },
]
const auth = () => {
  if (localStorage.getItem('pc-key')) {
    return true
  } else {
    return false
  }
}
export { auth }
