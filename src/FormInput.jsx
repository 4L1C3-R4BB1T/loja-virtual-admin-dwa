const FormInput = ({ type, field, onChange, label, value, error, autofocus=false }) => {
    return (
        <>
            <div className="form-floating">
                <input type={type} className={`form-control ${error ? 'is-invalid' : 'is-valid'}`}
                    id={field} name={field} placeholder=" " value={value || ""} onChange={onChange}
                    autoFocus={autofocus} />
                <label htmlFor={field}>{label}</label>
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
}

export default FormInput;