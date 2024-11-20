import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CurrencyFormatter, NumberFormatter } from "./formatters";

const TableProductsLine = ({ item, handleDeleteProduct }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>
               { item.imagemUrl && (
                 <div>
                    <img className="rounded shadow-lg" src={item.imagemUrl} style={{ width: '80px', height: '80px'}}/>
                </div>
               )}
            </td>
            <td>{item.nome}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <td>
                <span className="d-flex align-items-center gap-2">
                    {item.categoria} <div style={{ height: '20px', width: '20px', borderRadius: '50%', backgroundColor: item.cor}}></div>
                </span>
            </td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir"
                    onClick={() => handleDeleteProduct(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
                <Link to={`/products/${item.id}`} className="btn btn-outline-primary btn-sm ms-2" title="Alterar">
                    <i className="bi bi-pencil"></i>
                </Link>
            </td>
        </tr>
    );
}

TableProductsLine.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired
};

export default TableProductsLine;