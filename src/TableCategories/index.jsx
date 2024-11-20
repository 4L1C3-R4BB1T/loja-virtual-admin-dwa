import PropTypes from "prop-types";
import TableCategoriesLine from "../TableCategoriesLine";
import './style.css';

const TableCategories = ({ items, handleDeleteCategory }) => {
    return (
       <div className="table-responsive mt-4" style={{ maxHeight: '50vh'}}>
            <table className="table table-striped border table-hover">
                <thead className="table-dark table-sticky">
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Cor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(c => <TableCategoriesLine item={c} key={c.id} handleDeleteCategory={handleDeleteCategory} />)}
                </tbody>
            </table>
       </div>
    );
}

TableCategories.propTypes = {
    items: PropTypes.array.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired
};

export default TableCategories;