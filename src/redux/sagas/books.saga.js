
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBooks(action) {
  const currentKidId = localStorage.getItem('current_kid_id')
  parseInt(currentKidId)
  try {
    const response = yield axios({
      method: 'GET',
      url: '/books',
      headers: { currentKidId }
    });
    console.log('currentKidId---->', currentKidId)
    console.log('get all books:', response.data);
    yield put({ type: 'SET_BOOKS', payload: response.data });

  } catch {
    console.log('get all books error');
  }

}

function* fetchCompleted() {
  const currentKidId = localStorage.getItem('current_kid_id')
  
  try {
    const response = yield axios({
      method: 'GET',
      url: `/completed`,
      headers: { currentKidId }
    });
    console.log('GET Completed Books:', response.data);
    yield put({ type: 'SET_COMPLETED_BOOKS', payload: response.data });

  } catch {
    console.log('GET/COMPLETED books error');
  }

}


function* fetchParent() {
  const currentKidId = localStorage.getItem('current_kid_id')
  
  try {
    const response = yield axios({
      method: 'GET',
      url: `/parent`,
      headers: { currentKidId }
    });
    console.log('GET all Books for parents:', response.data);
    yield put({ type: 'SET_BOOKS', payload: response.data });

  } catch {
    console.log('GET/PARENT books error');
  }

}


function* createBooks(action) {
  const currentKidId = localStorage.getItem('current_kid_id')
  // if curentKidId is 0, that means we're in "parent mode"
  // in that case, action.payload should have a kidId value in it
  // so then, we'd reassign the value of currentKidId to equal action.payload.kidId
  console.log('payload post kid******************',action.payload.kid)
  if(currentKidId === '0'){
      currentKidId === action.payload.kid
  try {
    const response = yield axios({
      method: 'POST',
      url: '/books',
      headers: { currentKidId },
      data: action.payload
    })
    console.log('response from create books*******************************>',response.data)
    yield put({
      type: 'FETCH_BOOKS' ,payload: response.data
    })
  } catch {
    console.log('ERROR/POST Books');
  } 
} else {
  try {
    const response = yield axios({
      method: 'POST',
      url: '/books',
      headers: { currentKidId },
      data: action.payload
    })
    console.log('response from create books*******************************>',response.data)
    yield put({
      type: 'FETCH_BOOKS' ,payload: response.data
    })
  } catch {
    console.log('ERROR/POST Books');
  } 


}
}

function* deleteBooks(action) {
  const currentKidId = localStorage.getItem('current_kid_id')
  try {
    const response = yield axios({
      method: 'DELETE',
      url: `/books/${action.payload}`,
      headers: { currentKidId }
    })
    yield put({
      type: 'FETCH_BOOKS'
    })
  } catch {
    console.log('ERROR/DELETE Books');
  }
}

function* completeBook(action) {
  const currentKidId = localStorage.getItem('current_kid_id')
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/books/${action.payload}`,
      headers: { currentKidId }
    })
    yield put({
      type: 'FETCH_COMPLETED_BOOKS'
    })
  } catch {
    console.log('ERROR/COMPLETE Books');
  }
}

function* editBook(action) {
  const currentKidId = localStorage.getItem('current_kid_id')
  try {
    const response = yield axios({
      method: 'GET',
      url: `/edit/${action.payload}`,
      headers: { currentKidId }
    })
    yield put({
      type: 'SET_EDIT_BOOKS', payload: response.data
    })
  } catch {
    console.log('ERROR/EDIT Books');
  }
}

function* updateBook(action) {
  const currentKidId = localStorage.getItem('current_kid_id')

  try {
    const editBook = action.payload;
    console.log('editBook in updateBook----', editBook)
    const response = yield axios({
      method: 'PUT',
      url: `/edit/${editBook.id}`,
      headers: { currentKidId },
      data: {
        title: editBook.title,
        author: editBook.author,
        publish_year: editBook.publish_year,
        description: editBook.description,
        image_url: editBook.image_url,
        total_pages: editBook.total_pages,
        current_page: editBook.current_page
      }
    })
    yield put({
      type: 'FETCH_BOOKS'
    })
  } catch (err) {
    console.log('ERROR IN UPDATE BOOKS',err)
  }
}


function* rateBook(action) {
  const currentKidId = localStorage.getItem('current_kid_id')
  console.log('rateBook action.payload', action.payload.id)
   const rating = action.payload
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/rate/${rating.id}`,
      headers: { currentKidId },
      data: action.payload
    })
    console.log('response RATE BOOK--------->',response)
    yield put({
      type: 'FETCH_COMPLETED_BOOKS' ,payload: response.data
    })
  } catch {
    console.log('ERROR/POST PARENT Books');
  }
}

function* booksSaga() {
  yield takeLatest('FETCH_BOOKS', fetchBooks);
  yield takeLatest('CREATE_BOOKS', createBooks);
  yield takeLatest('DELETE_BOOKS', deleteBooks);
  yield takeLatest('COMPLETED_BOOK', completeBook);
  yield takeLatest('FETCH_COMPLETED_BOOKS',fetchCompleted);
  yield takeLatest('EDIT_ONE_BOOK',editBook);
  yield takeLatest('FETCH_PARENT',fetchParent);
  yield takeLatest('UPDATE_BOOK',updateBook);
// yield takeLatest('CREATE_PARENT_BOOKS',createParentBook)
yield takeLatest('RATE_BOOK',rateBook);

};

export default booksSaga;