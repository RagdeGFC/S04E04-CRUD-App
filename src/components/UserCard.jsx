import { BiSolidGift } from 'react-icons/bi';
import { HiPencilSquare } from 'react-icons/hi2';
import { FaTrashCan } from 'react-icons/fa6';
import { TfiEmail } from 'react-icons/tfi';

function UserCard({ user, openEdit, deleteUser }) {
	return (
		<div className="card">
			<h3 className="card__name">
				{user?.first_name} {user?.last_name}
			</h3>
			<div className="card__info">
				<div>
					<span className="card__label">Email: </span>
					<span className="card__data">
						<TfiEmail className="icon--gift" />
						{user?.email}
					</span>
				</div>
				<div>
					<span className="card__label">Birthday: </span>
					<span className="card__data">
						<BiSolidGift className="icon--gift" /> {user?.birthday}
					</span>
				</div>
			</div>
			<div className="card__btns">
				<button
					className="btn btn--delete"
					// onClick={() => deleteUser(user?.id)}
					onClick={() => {
						if (
							window.confirm(
								'¿Estás seguro de que deas eliminar este elemento?',
							)
						) {
							deleteUser(user?.id);
							console.log('elemento eliminado');
						} else {
							console.log('accion cancelada');
						}
					}}
				>
					<FaTrashCan />
				</button>
				<button className="btn btn--edit" onClick={() => openEdit(user)}>
					<HiPencilSquare />
				</button>
			</div>
		</div>
	);
}

export default UserCard;
