import PropTypes from "prop-types";
import FormInput from "../FormInput";

const CategoryForm = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput type="text" field="descricao" label="Descrição" value={inputs?.descricao}
                        onChange={handleChange} error={errors?.descricao} autofocus={true} />
                </div>
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