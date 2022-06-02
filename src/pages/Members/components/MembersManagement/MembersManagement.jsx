import {useSorting} from "../../../../hook/useSorting";
import {useEffect, useState} from "react";

import {getClassNames} from "../../../../functions/getClassNames";

import {Modal} from "../../../../components/Modal/Modal";
import {EditField} from "../../../../components/EditField/EditField";
import {ReadField} from "../../../../components/ReadField/ReadField";

import "./MembersManagement.scss";
import {
    collection,
    onSnapshot,
    query,
    where,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    deleteDoc,
    setDoc,
} from "firebase/firestore";
import {db, app, auth} from "../../../../firebase";

import {createUser, updateUser, deleteUser} from "../../../../store/crudSlice";
import {useDispatch} from "react-redux";
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {logOut} from "../../../../store/authSlice";
import {clearUserData} from "../../../../store/userDataSlicer";

const MembersManagement = () => {
    const auth = getAuth();
    const password = "111111";
    const [modalOpen, setModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [addFormData, setAddFormData] = useState("");
    const [editFormData, setEditFormData] = useState("");
    const [editUser, setEditUser] = useState(null);

    const dispatch = useDispatch();

    const {items, requestSort, sorting} = useSorting(members);

    useEffect(() => {
        let q;
        q = query(
            collection(db, "users"),
            where("role", "==", "user"));

        const membersList = onSnapshot(q, (querySnapshot) => {
            let membersArray = [];

            querySnapshot.forEach((doc) => {
                membersArray.push({...doc.data(), id: doc.id});
            });
            setMembers(membersArray);
        });
        return () => membersList();

    }, []);


    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword( auth, addFormData.email, password)
            .then((userCredential) => {
                // Signed in
                dispatch(
                    createUser({
                        email: userCredential.user.email,
                        id: userCredential.user.uid,
                    }),
                )
                return {
                    email: userCredential.user.email,
                    id: userCredential.user.uid,
                }
            })
            .then((data) => {
                dispatch(
                    createUser({
                        name: addFormData.name,
                        role: "user",
                        score: addFormData.score,
                        birthday: addFormData.birthday,
                        organization: addFormData.organization,
                        telephone: addFormData.telephone,
                    })
                )
                return {
                    id: data.id,
                    email: data.email,
                    name: addFormData.name,
                    role: "user",
                    score: addFormData.score,
                    birthday: addFormData.birthday,
                    organization: addFormData.organization,
                    telephone: addFormData.telephone,
                }
            })
            .then((user) => {
                setDoc(doc(db, "users", user.id), {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    score: user.score,
                    birthday: user.birthday,
                    organization: user.organization,
                    telephone: user.telephone,
                })
            })
            .catch((error) => {
                console.error(error);
            });

        signOut(auth)
            .then(() => {
                dispatch(logOut());
                dispatch(clearUserData());
                localStorage.clear();
            })
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
            name: editFormData.name,
            email: editFormData.email,
            telephone: editFormData.telephone,
            organization: editFormData.organization,
            score: editFormData.score,
            birthday: editFormData.birthday,
        };
        /*const newPersons = [...items];*/
        /*newPersons[index] = editedContact;
        setMembers(newPersons);*/
        const item = items.filter((el) => el.id === editFormData.id);
        const document = doc(db, "users", item[0].id);
        getDoc(document)
            .then((data) => {
                dispatch(
                    updateUser({
                        name: editedContact.name,
                        score: editedContact.score,
                        birthday: editedContact.birthday,
                        organization: editedContact.organization,
                        telephone: editedContact.telephone,
                    })
                )
                updateDoc(doc(db, "users", item[0].id), {
                    name: editedContact.name,
                    score: editedContact.score,
                    birthday: editedContact.birthday,
                    organization: editedContact.organization,
                    telephone: editedContact.telephone,
                });
            })
        setEditUser(null);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };

    const handleCancelClick = () => {
        setEditUser(null);
    };

    const handleDeleteClick = (itemId) => {
        /*const newItems = [...items];
        const index = items.findIndex((item) => item.id === itemId);
        newItems.splice(index, 1);
        setMembers(newItems);*/
        const user = items.filter((el) => el.id === itemId);
        const document = doc(db, "users", user[0].id);

        getDoc(document)
            .then(()=>{
                deleteDoc(document);
                dispatch(
                    deleteUser({
                        email: null,
                        token: null,
                        id: null,
                        name: null,
                        role: null,
                        score: null,
                        birthday: null,
                        organization: null,
                        telephone: null,
                    })
                )
            })

    };

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditUser(item.id);
        const formValues = {
            name: item.name,
            email: item.email,
            telephone: item.telephone,
            organization: item.organization,
            score: item.score,
            birthday: item.birthday,
            id: item.id,
        };
        setEditFormData(formValues);
    };

    return (
        <div className="container-xl members-container">
            <main>
                <h3 className="title-management">Members Management</h3>
                <button
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    type="button"
                    className="btn btn-primary btn-create-user openModalBtn"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus-square"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    <span className="btn-create-user-text">Add a new user</span>
                </button>
                {modalOpen && (
                    <Modal
                        setModalOpen={setModalOpen}
                        handleAddFormChange={handleAddFormChange}
                        handleAddFormSubmit={handleAddFormSubmit}
                    />
                )}

                <table className="table-secondary table table-hover">
                    <thead>
                    <tr>
                        <th
                            scope="col"
                            onClick={() => requestSort("name")}
                            className={`${getClassNames("name", sorting)} w-15`}
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            onClick={() => requestSort("email")}
                            className={`${getClassNames("email", sorting)} w-15`}
                        >
                            Email
                        </th>
                        <th scope="col">Telephone</th>
                        <th
                            scope="col"
                            onClick={() => requestSort("organization")}
                            className={`${getClassNames("organization", sorting)} w-10`}
                        >
                            Company
                        </th>
                        <th
                            scope="col"
                            onClick={() => requestSort("score")}
                            className={`${getClassNames("score", sorting)} w-15`}
                        >
                            Score
                        </th>
                        <th
                            scope="col"
                            onClick={() => requestSort("birthday")}
                            className={`${getClassNames("birthday", sorting)} w-15`}
                        >
                            Date of Birth
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <>
                            {editUser === item.id ? (
                                <EditField
                                    key={item.id}
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                    handleCancelClick={handleCancelClick}
                                />
                            ) : (
                                <ReadField
                                    key={item.id}
                                    item={item}
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}
                                />
                            )}
                        </>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default MembersManagement;
