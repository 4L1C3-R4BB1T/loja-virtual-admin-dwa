import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [cacheProducts, setCacheProducts] = useState([]);

    const loadProducts = () => {
        setLoading(true);
        api.get(`admin/obter_produtos?timestamp=${new Date().getTime()}`)
            .then((response) => {
                setProducts(response.data);
                setCacheProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    const deleteProduct = (productId) => {
        setLoading(true);
        api.postForm("admin/excluir_produto", { "id_produto": productId })
            .then(response => {
                if (response.status === 204) {
                    loadProducts();
                }
            })
            .catch(error => {
                console.log('Erro ao excluir produto:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteProduct = (productId) => {
        setSelectedProductId(productId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteProduct'));
        modal.show();
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const searchProduct = event => {
        const term = event.target.value;
        if (term?.trim() === '') {
            setCacheProducts(products);  // Se o termo estiver vazio, exibe todos os produtos
            return;
        }
        
        setCacheProducts(products.filter(({ id, nome, preco, descricao, cor, estoque, categoria }) => {
            const lowerTerm = term.toLowerCase();
    
            return (
                String(id).includes(lowerTerm) || 
                nome.toLowerCase().includes(lowerTerm) ||
                String(preco).includes(lowerTerm) ||
                descricao.toLowerCase().includes(lowerTerm) ||
                cor.toLowerCase().includes(lowerTerm) ||
                String(estoque).includes(lowerTerm) ||
                categoria.toLowerCase().includes(lowerTerm)
            );
        }));
    };

    return (
        <>
     
            <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/products/create" className="btn btn-primary my-3">Novo Produto</NavLink>
                <span className="flex flex-col gap-2">
                    <div className="input-group mb-3 mt-4" style={{ maxWidth: '30vw'}}>
                            <input onChange={searchProduct} type="text" className="form-control" placeholder="Escreva..." />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Pesquisar</button>
                        </div>
              </span>
            </div>
            {cacheProducts.length > 0 ?
                <>
                    <ModalConfirm modalId="modalDeleteProduct" question="Deseja realmente excluir o produto?"
                        confirmAction={() => deleteProduct(selectedProductId)} />
                    <TableProducts items={cacheProducts} handleDeleteProduct={handleDeleteProduct} />
                </> :
                (!loading && <NoProducts />)}
            {loading && <Loading />}
        </>
    );
}

export default Products;