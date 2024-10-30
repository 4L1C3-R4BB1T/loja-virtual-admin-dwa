import { CurrencyFormatter, NumberFormatter } from "./formatters";

const TableProductsLine = ({ item, handleDeleteProduct }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.nome}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir Produto"
                    onClick={() => handleDeleteProduct(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    );
}

export default TableProductsLine;