import "cleave.js/dist/addons/cleave-phone.br";
import Cleave from "cleave.js/react";
 
const CleaveInput = ({ type, field, onChange, options, label, value, error }) => { 
    return ( 
        <> 
            <div className="form-floating"> 
                <Cleave type={type} className={`form-control ${error ? 'is-invalid' : 'is-valid'}`}
                    id={field} name={field} placeholder=" " onChange={onChange} options={options} value={value} /> 
                <label htmlFor={field}>{label}</label> 
            </div> 
            {error && <div className="invalid-feedback">{error}</div>}
        </> 
    ); 
}; 
 
export default CleaveInput;