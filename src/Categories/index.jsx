import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../axiosApi";
import Loading from "../Loading";
import ModalConfirm from "../ModalConfirm";
import NoCategories from "../NoCategories";
import TableCategories from "../TableCategories";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    const loadCategories = () => {
        setLoading(true);
        api.get("admin/obter_categorias")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteCategory = (categoryId) => {
        setLoading(true);
        api.postForm("admin/excluir_categoria", { "id_categoria": categoryId })
            .then(response => {
                if (response.status === 204) {
                    loadCategories();
                }
            })
            .catch(error => {
                console.error('Erro ao excluir a categoria:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteCategory'));
        modal.show();
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <>
            <NavLink to="/categories/create" className="btn btn-primary my-3">Nova Categoria</NavLink>
            {categories.length > 0 ?
                <>
                    <ModalConfirm modalId="modalDeleteCategory" question="Deseja realmente excluir esta categoria?"
                        confirmAction={() => deleteCategory(selectedCategoryId)} />
                    <TableCategories items={categories} handleDeleteCategory={handleDeleteCategory} />
                </> :
                (!loading && <NoCategories />)}
            {loading && <Loading />}
        </>
    );
}

export default Categories;