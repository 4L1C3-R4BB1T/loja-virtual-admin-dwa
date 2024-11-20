import React from "react";
import { NavLink } from "react-router-dom";
import api from "../axiosApi";
import Loading from "../Loading";
import ModalConfirm from "../ModalConfirm";
import NoCategories from "../NoCategories";
import TableCategories from "../TableCategories";
import useFetch from "../hooks/useFetch";
import { environment } from "../configs/environment";

const OBTER_CATEGORIAS_ENDPOINT = 'admin/obter_categorias';
const EXCLUIR_CATEGORIA_ENDPONT = 'admin/excluir_categoria';

const Categories = () => {
    const { loading, data, getData } = useFetch();
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);
    const [cacheCategorias, setCacheCategorias] = React.useState([]);
    const [orderById, setOrderById] = React.useState(true);

    const loadCategories = React.useCallback(async () => {
        await getData(`${environment.API_URL}${OBTER_CATEGORIAS_ENDPOINT}`, { method: 'GET'});
    }, [getData]);

    React.useEffect(() => {
        if (!data || !Array.isArray(data)) {
            setCacheCategorias([]);
            return;
        }
        setCacheCategorias(data);
    }, [data]);

    React.useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const deleteCategory = async id => {
        const { result } = await getData(`${environment.API_URL}${EXCLUIR_CATEGORIA_ENDPONT}/${id}`, { 
            method: 'DELETE',
        });
        if (!result.deletado) {
            window.alert('Não foi possível deletar a categoria');
            return;
        }
        await loadCategories();
    };

    const handleDeleteCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteCategory'));
        modal.show();
    }

    const searchCategory = event => {
        if (!data || !Array.isArray(data)) return;

        const term = event.target.value;

        if (term?.trim() === '') {
            setCacheCategorias(data);
        } else {
            setCacheCategorias(data.filter(({ id, descricao, cor }) => `${id.toString().padStart(5, '0')}${descricao}${cor}`.includes(term.trim())));
        }
    }

    const onOrderById = event => {
        const value = event.target.value;
        if (value === 'crescente') {
            setCacheCategorias(data);
            return;
        } 
        const sortedCategorias = [...data];
        sortedCategorias.sort((a, b) => b.id - a.id);
        setCacheCategorias(sortedCategorias);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/categories/create" className="btn btn-primary my-3">Nova Categoria</NavLink>
              <span className="flex flex-col gap-2">
                <div className="input-group mb-3 mt-4" style={{ maxWidth: '30vw'}}>
                        <input onChange={searchCategory} type="text" className="form-control" placeholder="Escreva..." />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Pesquisar</button>
                    </div>
                    <div className="ms-auto" style={{ width: '50%'}}>
                        <label className="fw-semibold lead" style={{ fontSize: '12px'}}>Ordenar em:</label>
                        <select onChange={onOrderById} className="form-select mt-1">
                            <option selected value="crescente">Crescente</option>
                            <option value="decrescente">Decrescente</option>
                        </select>
                    </div>
              </span>
            </div>
            { (cacheCategorias && cacheCategorias.length > 0) ?
                <>
                    <ModalConfirm modalId="modalDeleteCategory" question="Deseja realmente excluir esta categoria?"
                        confirmAction={() => deleteCategory(selectedCategoryId)} />
                    <TableCategories items={cacheCategorias} handleDeleteCategory={handleDeleteCategory} />
                </> :
                (!loading && <NoCategories />)}
            {loading && <Loading />}
        </>
    );
}

export default Categories;