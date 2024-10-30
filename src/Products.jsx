import { useEffect, useState } from "react";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(0);

    const loadProducts = () => {
        setLoading(true);
        api.get("obter_produtos")
            .then((response) => {
                setProducts(response.data);
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
        api.post("excluir_produto", {"id_produto": productId})
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

    return (
        <>
            {products.length > 0 ?
                <>
                    <ModalConfirm modalId="modalDeleteProduct" question="Deseja realmente excluir o produto?"
                        confirmAction={() => deleteProduct(selectedProductId)} />
                    <TableProducts items={products} handleDeleteProduct={handleDeleteProduct} />
                </> :
                (!loading && <NoProducts />)}
            {loading && <Loading />}
        </>
    );
}

export default Products;