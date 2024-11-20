import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NumberFormatter } from "../formatters";

const TableCategoriesLine = ({ item, handleDeleteCategory }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.descricao}</td>
            <td>
                <div style={{ width: '30px', height: '30px', borderRadius: '100%', backgroundColor: item.cor }}></div>
            </td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir Categoria"
                    onClick={() => handleDeleteCategory(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
                <Link to={`/categories/create?id=${item.id}`}  className="btn btn-outline-primary btn-sm ms-2" title="Alterar">
                    <i className="bi bi-pencil"></i>
                </Link>
            </td>
        </tr>
    );
}

TableCategoriesLine.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired
};

export default TableCategoriesLine;