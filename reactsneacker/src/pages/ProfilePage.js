import React, {useState, useEffect} from "react";
import { FormControl, TextField, InputLabel, Input } from "@mui/material";
import { DateMask, handleChange, PhoneMask } from "../services/masks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser, updateUser } from "../state/actions";
import { checkData, formatDate } from "../services/service";
import { callAlert } from "../services/callAlert";
import { API_URL } from "../env";







export default function ProfilePage() {

  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false);
  const cssClassLabel = "css-1c2i806-MuiFormLabel-root-MuiInputLabel-root"
  const [values, setValues] = useState({});


  useEffect (() =>{
    if(!auth.isAuthenticated){
      navigate('/login')
    }
  }, [auth.isAuthenticated])

  useEffect(() =>{
    setValues({
      phone: auth.user.phone,
      date: formatDate(auth.user.date_birth),
      last_name: auth.user.last_name,
      first_name: auth.user.first_name,
      address: auth.user.address,
      patronymic: auth.user.patronymic,
      email: auth.user.email,
    })

  },[auth.user.email,])


  const handleSubmit = () =>{

    if ((checkData(values.date) === 10 || checkData(values.date) === null) && 
    (values.phone.length === 18 || values.phone.length === 0)){
      setEdit(false)

      dispatch(updateUser({
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        address: values.address,
        patronymic: values.patronymic,
        date_birth: formatDate(values.date)
    },
    auth.token))
    } else{
      let array = []
      const type = 'error'
      if(checkData(values.date) !== 10 && checkData(values.date) !== null){
        array.push('Не верная форма запись даты')
      }
      if(values.phone.length !== 18 && values.phone.length !== 0){
        array.push('Не верная форма запись телефона')
      }
      callAlert(array, type, dispatch)
    }

    
  }
  

  async function handlePhoto(event){
    const data = new FormData()
    data.append("photo",event.target.files[0])
    dispatch(updateUser(data, auth.token))
  }

    return (
        <div className="profile">
            <div onClick={() => setEdit(false)} className={edit ? "overlay overlayActive" : "overlay"}></div>
            <button className="btn-edit" onClick={() => setEdit(true)}>
              Редактировать
            </button>
            <div className="profileImg">
                <div>
                  <img src={auth.user.photo === null ? "/static/Person.png": auth.user.photo} />
                </div>
                <input type="file" id="uploadImg" className="opacity-0 pos-a " onChange={handlePhoto}/>
                <label htmlFor="uploadImg" className="btn-profile">Загрузить</label> 
                <button className="btn-profile" style={{backgroundColor: "#fb7070"}} onClick={() => dispatch(updateUser({photo: null}, auth.token))}>Удалить</button>
            </div>
            
                
                <div className="mainInfo">
                    <FormControl variant="standard" className="profileInput profileInputPlus">
                    <InputLabel required className={values.last_name && cssClassLabel}>Фамилия</InputLabel>
                    <Input
                        value={values.last_name}
                        name="last_name"
                        onChange={(event) => handleChange(event, values,setValues)}
                        id="last_name"
                        readOnly={!edit}
                    />
                    </FormControl>
                    <FormControl variant="standard" className="profileInput profileInputPlus">
                    <InputLabel required className={values.first_name && cssClassLabel}>Имя</InputLabel>
                    <Input
                        value={values.first_name}
                        name="first_name"
                        id="first_name"
                        onChange={(event) => handleChange(event, values,setValues)}
                        readOnly={!edit}
                    />
                    </FormControl>
                    <FormControl variant="standard" className="profileInput profileInputPlus">
                    <InputLabel className={values.patronymic && cssClassLabel}>Отчество</InputLabel>
                    <Input
                        onChange={(event) => handleChange(event, values, setValues)}
                        value={values.patronymic}
                        name="patronymic"
                        id="patronymic"
                        readOnly={!edit}
                    />
                    </FormControl>
                    <FormControl variant="standard" className="profileInput profileInputPlus">
                    <InputLabel>Дата рождения</InputLabel>
                    <Input
                        value={values.date}
                        placeholder={'00.00.0000'}
                        onChange={(event) => handleChange(event, values, setValues)}
                        name="date"
                        id="date"
                        inputComponent={DateMask}
                        readOnly={!edit}
                    />
                    </FormControl>
                </div>
                <div className="contactInfo">
                <FormControl variant="standard" className="profileInput">
                    <InputLabel>Телефон</InputLabel>
                    <Input
                        value={values.phone}
                        placeholder={'+7 (900) 000-00-00'}
                        onChange={(event) => handleChange(event, values,setValues)}
                        name="phone"
                        id="phone"
                        inputComponent={PhoneMask}
                        readOnly={!edit}
                    />
                </FormControl>
                <FormControl variant="standard" className="profileInput profileInputPlus">
                    <InputLabel required className={values.email && cssClassLabel}>Email</InputLabel>
                    <Input
                        value={values.email}
                        name="email"
                        id="email"
                        onChange={(event) => handleChange(event, values,setValues)}
                        readOnly={!edit}
                    />
                    </FormControl>
                <FormControl variant="standard" className="profileInput profileInputPlus">
                    <InputLabel className={values.address && cssClassLabel}>Адрес доставки</InputLabel>
                    <Input
                        value={values.address}
                        name="address"
                        id="address"
                        onChange={(event) => handleChange(event, values,setValues)}
                        readOnly={!edit}
                    />
                    </FormControl>
                  
                <button className={ !edit ? "btn-profile btn-save-info" : "btn-profile btn-save-info btn-save-info-active"}onClick={handleSubmit}>
                  Сохранить
                </button>
                <button className={ edit ? "btn-profile btn-save-info" : "btn-profile btn-save-info btn-save-info-active"} style={{backgroundColor: "#fb7070", zIndex: 0}} onClick={() => dispatch(logoutUser(auth.token))}>Выйти</button>
                
                </div>
            </div>
    )
}