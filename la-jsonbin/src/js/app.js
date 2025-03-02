import HTTPServices from './http.js';
import UI from './ui.js';

const httpServices = new HTTPServices();
const ui = new UI();

const remoteDataURL = "https://api.jsonbin.io/v3/b/6070a88dceba85732671d94c/2";

document.addEventListener('DOMContentLoaded', getItems);
document.querySelector('#form').addEventListener('click', submitForm);
document.querySelector('#list').addEventListener('click', setupForEditOrDelete);

ui.changeFormState('add');

function getItems() {
  httpServices.get(remoteDataURL)
  .then(data => {
    ui.showItems(data);
  })
  .catch(err => console.log(err));
}

function submitForm(e) {
  const {title, description, id} = ui.getFormData();
  const data = {
    title,
    description
  }
  if(e.target.classList.contains('add')) {
    let {message, isNotValid} = ui.validateFormData(title, description);
    if(isNotValid){
      ui.showAlert(message, 'error-message');
    }
    // if(title === '' || description === '') {
    //   ui.showAlert('Please fill in all fields', 'error-message');
    // } 
    else {
      httpServices.post('http://localhost:3000/items', data)
      .then(data => {
        ui.showAlert('Job Added', 'success-message');
        ui.clearFormData();
        getItems();
      })
      .catch(err => console.log(err));
    } 
  } 
  else if(e.target.classList.contains('edit')) {
    httpServices.put(`http://localhost:3000/items/${id}`, data)
    .then(data => {
      ui.showAlert('Job Updated', 'success-message');
      ui.changeFormState('add');
      ui.clearFormData();
      getItems();
    })
    .catch(err => console.log(err));
  } 
  else if(e.target.classList.contains('delete')) {
    httpServices.delete(`http://localhost:3000/items/${id}`)
    .then(data => {
      ui.showAlert('Job Deleted', 'success-message');
      ui.changeFormState('add');
      ui.clearFormData();
      getItems();
    })
    .catch(err => console.log(err));
  }
  else if(e.target.classList.contains('cancel')) {
    ui.changeFormState('add');
    ui.clearFormData();
  }
}

function setupForEditOrDelete(e) {
  const id = e.target.parentElement.dataset.id;
  const title = e.target.parentElement.parentElement.children[0].textContent;
  const description = e.target.parentElement.parentElement.children[1].textContent;
  const data = {
    title,
    description,
    id
  }
  ui.fillFormData(data);
  ui.clearAlert();
  if(e.target.parentElement.classList.contains('edit')) {
    ui.changeFormState('edit');
  }
  else if (e.target.parentElement.classList.contains('delete')) {
    ui.changeFormState('delete');
  }
}