import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axiosApi";
import CategoryForm from "../CategoryForm";
import FormButtons from "../FormButtons";
import handleChange from "../handleChange";
import Loading from "../Loading";
import parseErrors from "../parseErrors";

const EditCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const idCategoria = useParams().id;
    
    if (!idCategoria) {
        navigate("/categories");
    }
    
    function loadCategoryById(id) {
        setLoading(true);
        api.get(`admin/obter_categoria/${id}`)
            .then(response => {
                setInputs(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Erro ao carregar categoria:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        await api.post("admin/alterar_categoria", inputs)
            .then((response) => {
                if (response.status === 204) {
                    navigate("/categories");
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                if (error && error.response && error.response.data) {
                    setErrors(parseErrors(error.response.data));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }
    
    useEffect(() => {
        setInputs({ ...inputs, id: idCategoria });
        loadCategoryById(idCategoria);
    }, [idCategoria]);
    
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração de Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                <CategoryForm handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default EditCategory;