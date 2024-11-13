import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./axiosApi";
import FormButtons from "./FormButtons";
import handleChange from "./handleChange";
import Loading from "./Loading";
import parseErrors from "./parseErrors";
import ProductForm from "./ProductForm";

const CreateProduct = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

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
        await api.postForm("admin/inserir_produto", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate("/products");
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

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Inclusão de Produto</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                <ProductForm handleChange={localHandleChange} inputs={inputs} errors={errors}
                    handleFileChange={handleFileChange} />
                <FormButtons cancelTarget="/products" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default CreateProduct;