import { useState, useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate('/login')
        }  


        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            //nombre del input, input que acabamos de modificar
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Las contraseñas no coinciden')
        } else {
            //data del authSlice
            const userData = {name, email, password}
            //dispatchar el userdata para qeu esa funcion sea pasada al authService
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <h4>
                    <FaUser /> Registrar
                </h4>
                <p>Por favor crea una cuenta</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className='form-control'
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            placeholder='Teclea tu nombre'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            className='form-control'
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            placeholder='Teclea tu email'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            className='form-control'
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder='Teclea tu password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            className='form-control'
                            type="password"
                            name="password2"
                            id="password2"
                            value={password2}
                            placeholder='Confirma tu password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register