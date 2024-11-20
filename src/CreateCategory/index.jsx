import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { environment } from "../configs/environment";
import FormButtons from "../FormButtons";
import handleChange from "../handleChange";
import useFetch from "../hooks/useFetch";
import Loading from "../Loading";
import parseErrors from "../parseErrors";
import './style.css';

const CRIAR_CATEGORIA_ENDPOINT = 'admin/inserir_categoria';
const OBTER_CATEGORIA_POR_ID_ENDPOINT = id => `admin/obter_categoria/${id}`;
const ATUALIZAR_CATEGORIA_POR_ID_ENDPOINT =  `admin/alterar_categoria`;

const CreateCategory = () => {
    const [inputs, setInputs] = React.useState({
        cor: 'black'
    });
    const [errors, setErrors] = React.useState({});
    const { getData, loading, error } = useFetch();
    const [searchParams] = useSearchParams();
    const [id] = React.useState(searchParams.get('id'))
    const navigate = useNavigate();

    const loadCategoryById = React.useCallback(async id => {
        const { result } = await getData(`${environment.API_URL}${OBTER_CATEGORIA_POR_ID_ENDPOINT(id)}`, {
            method: 'GET',
        });
        if (!result) {
            navigate('/categories');
            return;
        }
        console.log(result)
        setInputs(result);
    }, [getData, navigate]);

    React.useEffect(() => {
        if (!error) return;
        setErrors(() => parseErrors(error));
    }, [error])

    React.useEffect(() => {
        if (!id) return;
        loadCategoryById(id);
    }, [loadCategoryById, id]);


    async function handleSubmit(event) {
        event.preventDefault();
        setErrors({});

        const { descricao } = inputs;

        const getErrors = () => {
            const errors = {};
            if (!descricao || descricao?.trim() === '') errors['descricao'] = 'A descrição é obrigatória';
            return errors;
        }

        const errors = getErrors();

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        };

        const endpoint = !id ? `${environment.API_URL}${CRIAR_CATEGORIA_ENDPOINT}` : `${environment.API_URL}${ATUALIZAR_CATEGORIA_POR_ID_ENDPOINT}`;

        const { hasError, result } = await getData(endpoint, {
            method: 'POST',
            body: JSON.stringify(inputs),
        });

        if (hasError) return;
        console.log(result)
        if (result?.criada || result?.alterado) {
            navigate('/categories');
            return;
        } else {
            setErrors({
                descricao: 'Já exista uma categoria  com essa descrição cadastrada',
            });
        }
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }


    return (
        <>
           <div className="pt-5">
            <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-5 fw-bold">{ id ? 'Atualizar Categoria' : 'Nova Categoria'}</h1>
                    <p className="lead fs-6">Clique na bolinha para adicionar uma cor</p>
            </div>
                <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                    <div className="d-flex justify-content-center">
                        {inputs?.cor && (
                            <div className="my-4"  
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    backgroundColor: inputs.cor,
                                    border: '1px solid #ddd',
                                    position: 'relative'
                                }}
                                title={`Cor: ${inputs.cor}`}>      
                                <span className="position-absolute top-50 start-50  translate-middle fw-bold fs-4 text-white">Cor</span>
                                <input type="color" name="cor" className="input-color" onChange={localHandleChange}/>
                            </div>
                        )}
                    </div>
                    <div className="form-floating mx-auto" style={{ maxWidth: '50vw'}}>
                        <textarea defaultValue={inputs.descricao || ''} name="descricao" onChange={localHandleChange} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                        <label htmlFor="floatingTextarea2">Descrição</label>
                        { errors.descricao &&  <div style={{ color: 'red' }} dangerouslySetInnerHTML={{__html: errors.descricao }}/> }
                        
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                        <FormButtons cancelTarget="/categories"  />
                    </div>
                </form>
               
           </div>
            {loading && <Loading />}
        </>
    );
}

export default CreateCategory;