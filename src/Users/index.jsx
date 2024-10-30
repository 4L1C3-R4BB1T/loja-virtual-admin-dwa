import { useEffect, useState } from "react";
import api from "../axiosApi";
import Loading from "../Loading";
import ModalConfirm from "../ModalConfirm";
import NoUsers from "../NoUsers";
import TableUsers from "../TableUsers";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadUsers = () => {
        setLoading(true);
        api.get("obter_usuarios")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    useEffect(() => {
        loadUsers();
    }, []);

    const deleteUser = (userId) => {
        setLoading(true);
        api.post(`excluir_usuario`, { id_usuario: userId })
            .then(response => {
                if (response.status === 204) {
                    loadUsers();
                }
            })
            .catch(error => {
                console.log('Erro ao excluir usuário:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteUser = (userId) => {
        setSelectedUserId(userId);
        const modal = new bootstrap.Modal(document.getElementById('modelDeleteUser'));
        modal.show();
    }

    return (
        <>
            {users.length > 0 ?
                <>
                    <ModalConfirm modalId="modelDeleteUser" question="Deseja realmente excluir o usuário?"
                        confirmAction={() => deleteUser(selectedUserId)} />
                    <TableUsers items={users} handleDeleteUser={handleDeleteUser} />
                </> :
                (!loading && <NoUsers />)}
            {loading && <Loading />}
        </>
    );
}

export default Users;