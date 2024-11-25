function Registro() {


    return (
        <>

        <div className="container-logo-titulo-registro">

        </div>
            <div className="container-form-registro">
                <form>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" />

                    <label htmlFor="mail">Mail</label>
                    <input type="text" id="mail" name="mail" />

                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="text" id="contraseña" name="contraseña" />

                    <label htmlFor="RepetirContraseña">Repetir Contraseña</label>
                    <input type="text" id="RepetirContraseña" name="RepetirContraseña" />

                    <label htmlFor="rol">Selecciona tu Rol</label>
                    <select name="rol" id="rol">
                        <option value="cliente">Cliente</option>
                        <option value="trabajardor">Trabajador</option>
                    </select>

                </form>
            </div>
            <p>¿Ya tienen un usuario</p>
            <p>Iniciar sesion</p>
        </>
    )
}