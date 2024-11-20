import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./axiosApi";
import FormButtons from "./FormButtons";
import handleChange from "./handleChange";
import Loading from "./Loading";
import parseErrors from "./parseErrors";
import ProductForm from "./ProductForm";

const EditProduct = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    
    const idProduto = useParams().id;
    
    if (!idProduto) {
        navigate("/products");
    }

    function handleFileChange(event) {
        const files = event.target.files;
        if (!files.length) return;
        const file = files[0];
        const previewImagemUrl = URL.createObjectURL(file);
        setInputs(inputs => ({...inputs, imagemUrl: previewImagemUrl }));
        setFile(file);
    }
    
    function loadProductById(id) {
        setLoading(true);
        api.get(`admin/obter_produto/${id}`)
            .then(response => {
                setInputs(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar produto:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();

        Object.entries(inputs).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (file) {
            formData.append("imagem", file);
        }

        await api.postForm(`admin/alterar_produto/${idProduto}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                navigate("/products");
            })
            .catch((error) => {
                if (error && error.response && error.response.data) {
                    let payload = error.response.data;
                    if (!Array.isArray(error.response.data) && typeof error.response.data === 'object' && !('detail' in payload)) {
                        payload = [payload];
                    } 
                    setErrors(parseErrors(payload));
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
        setInputs({ ...inputs, id: idProduto });
        loadProductById(idProduto);
    }, [idProduto]);
    
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="my-4">
                    <h1>Alteração de Produto</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                <ProductForm isEdicao handleFileChange={handleFileChange} handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/products" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default EditProduct;