import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CleaveInput from "./CleaveInput";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import api from "./axiosApi";

const ProductForm = ({ handleChange, handleFileChange, inputs, errors }) => {
    const [categories, setCategories] = useState([]);
    
    const loadCategories = () => {
        api.get("admin/obter_categorias")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        loadCategories();
    }, []);
    
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput type="text" field="nome" label="Nome" value={inputs?.nome}
                        onChange={handleChange} error={errors?.nome} autofocus={true} />
                </div>
                <div className="col-12 mb-3">
                    <FormTextarea field="descricao" label="Descrição" value={inputs?.descricao}
                        onChange={handleChange} error={errors?.descricao} />
                </div>
                <div className="col-4 mb-3">
                    <CleaveInput type="text" field="preco" label="Preço" value={inputs?.preco}
                        onChange={handleChange} error={errors?.preco}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                            prefix: 'R$ ',
                            rawValueTrimPrefix: true,
                            delimiter: '.',
                            numeralDecimalMark: ','
                        }} />
                </div>
                <div className="col-4 mb-3">
                    <CleaveInput type="text" field="estoque"
                        label="Estoque" onChange={handleChange}
                        value={inputs.estoque} error={errors?.estoque}
                        options={{
                            numeral: true,
                            numeralPositiveOnly: true,
                            numeralThousandsGroupStyle: 'thousand',
                            delimiter: '.',
                            numeralDecimalMark: ','
                        }} />
                </div>
                <div className="col-4 mb-3">
                    <div className="form-floating">
                        <select
                            className={`form-select form-control ${errors?.id_categoria ? 'is-invalid' : ''}`}
                            id="id_categoria"
                            name="id_categoria"
                            value={inputs?.id_categoria || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.descricao}
                                </option>
                            ))}
                        </select>
                        <label for="id_categoria">Categoria</label>
                        {errors?.id_categoria && <div className="invalid-feedback" dangerouslySetInnerHTML={{__html: errors?.id_categoria}} />}                        
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="imagem" className="form-label">Foto do Produto</label>
                    <input
                        type="file"
                        id="imagem"
                        name="imagem"
                        className={`form-control ${errors?.imagem ? 'is-invalid' : ''}`}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {errors?.imagem && <div className="invalid-feedback">{errors.imagem}</div>}
                </div>
            </div>
        </>
    );
}

ProductForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    inputs: PropTypes.object,
    errors: PropTypes.object
};

export default ProductForm;