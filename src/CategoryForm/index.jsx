import PropTypes from "prop-types";
import FormInput from "../FormInput";

const CategoryForm = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <FormInput type="text" field="descricao" label="Descrição" value={inputs?.descricao}
                        onChange={handleChange} error={errors?.descricao} autofocus={true} />
                </div>
                {/* <div className="col-3 mt-3 mb-4">
                    <FormInput value={inputs?.cor} type="color" field="cor" label="Cor" onChange={handleChange} error={errors?.cor}/> 
                </div> */}
            </div>
        </>
    );
}

CategoryForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    inputs: PropTypes.object,
    errors: PropTypes.object
};

export default CategoryForm;