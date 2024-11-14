import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosApi";
import CategoryForm from "../CategoryForm";
import FormButtons from "../FormButtons";
import handleChange from "../handleChange";
import Loading from "../Loading";
import parseErrors from "../parseErrors";

const CreateCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        Object.entries(inputs).forEach(([key, value]) => {
            formData.append(key, value);
        });
        await api.postForm("admin/inserir_categoria", formData)
            .then((response) => {
                if (response.status === 201) {
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

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Inclusão de Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                <CategoryForm handleChange={localHandleChange} inputs={inputs} errors={errors}
                    handleFileChange={handleFileChange} />
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default CreateCategory;