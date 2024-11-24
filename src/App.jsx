import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Layout from './layouts/Layout';
import AddEdit from './components/AddEdit';
import UserList from './components/UserList';
import Modal from './components/Modal';
import { bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9 } from './assets/images/';

const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
const baseUrl = 'https://users-crud-api-81io.onrender.com/api/v1';

function randomIndex(max) {
	return Math.floor(Math.random() * max);
}

function App() {
	const [users, setUsers, loading] = useFetch();
	const [isOpen, setIsOpen] = useState(false);
	const [currentChild, setCurrentChild] = useState(null);
	const [img, setImg] = useState(images[randomIndex(images.length)]);

	function changePhrase() {
		setImg(images[randomIndex(images.length)]);
	}

	useEffect(() => {
		readUsers();
	}, []);

	//create user
	const createUser = (dataForm) => {
		setUsers({
			url: `${baseUrl}/users`,
			method: 'POST',
			body: dataForm,
		});
		setIsOpen(false);
	};

	// Read all users
	const readUsers = () => {
		setUsers({ url: `${baseUrl}/users` });
	};

	//Update user
	const updateUser = (dataForm, userId) => {
		setUsers({
			url: `${baseUrl}/users/${userId}`,
			method: 'PATCH',
			body: dataForm,
		});
		setIsOpen(false);
	};

	//Delete user
	const deleteUser = (userId) => {
		setUsers({
			url: `${baseUrl}/users/${userId}`,
			method: 'DELETE',
		});
	};

	//handlerOpenModal
	const openAdd = () => {
		setIsOpen(true);
		setCurrentChild(<AddEdit onSave={createUser} />);
	};

	const openEdit = (user) => {
		setIsOpen(true);
		setCurrentChild(<AddEdit user={user} onSave={updateUser} />);
	};

	return (
		<div className="app" style={{ backgroundImage: `url('${img}')` }}>
			<Layout>
				<header className="header">
					<div className="header__container">
						<h1 className="header__title">User Management</h1>
						<button className="header__button" type="button" onClick={openAdd}>
							Add User
						</button>
						<button onClick={changePhrase} className="btn1">
							Change Background
						</button>
					</div>
				</header>

				<main
					className="container"
					// style={{ backgroundImage: `url('${img}')` }}
				>
					{loading ? (
						<h2>Loading...</h2>
					) : (
						<UserList
							users={users}
							openEdit={openEdit}
							deleteUser={deleteUser}
						/>
					)}
				</main>

				{/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					{currentChild}
				</Modal>
			</Layout>
		</div>
	);
}

export default App;
