import React from 'react'
import Logo from '../assets/logo-televisa.png'

const Login = () => {
    return (
        <div className='container'>
            <div className='row vh-100 justify-content-center align-items-center'>
                <div className='col-auto'>
                    <form>
                        <div className='text-center'>
                            <img class="mb-4" src={Logo} alt="" width="150" height="120" />
                        </div>

                        <h1 class="h3 mb-3 fw-normal">Favor de ingresar credenciales.</h1>
                        <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Usuario</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Contraseña</label>
                        </div>

                        <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Ingresar</button>
                        <p class="mt-5 mb-3 text-muted">Televisa Sonora &copy; 2022</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login