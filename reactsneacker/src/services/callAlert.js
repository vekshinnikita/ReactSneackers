import { hideAlert, showAlert } from "../state/actions"

const delay = time => new Promise(resolve => setTimeout(resolve, time))

export function* callAlertSaga(array,type, put){
  yield put(showAlert(array,type))
  yield delay(5000);
  yield put(hideAlert())
}

export function callAlert(array, type, dispatch){
  dispatch(showAlert(array,type))
  setTimeout(() => {
      dispatch(hideAlert())
  }, 5000)
}