import './Modal.scss';

export const Modal = ({ setModalOpen, handleAddUserSubmit, handleAddUser }) => {
	return (
		<div className='modalBackground'>
			<div className='modalContainer'>
				<div className='titleCloseBtn'>
					<button
						onClick={() => {
							setModalOpen(false);
						}}
					>
						X
					</button>
				</div>

				<div className='body'>
					<input
						className='form-control user-form'
						type='text'
						name='name'
						required='required'
						placeholder='Name'
					/>

					<input
						className='form-control user-form'
						type='email'
						name='email'
						required='required'
						placeholder='Email'
					/>

					<input
						className='form-control user-form'
						type='text'
						name='telephone'
						required='required'
						placeholder='Telephone'
					/>

					<input
						className='form-control user-form'
						type='text'
						name='organization'
						required='required'
						placeholder='Company'
					/>

					<input
						className='form-control user-form'
						type='number'
						name='score'
						required='required'
						placeholder='Score'
					/>

					<input
						className='form-control user-form'
						type='date'
						name='birthday'
						required='required'
						placeholder='Date of birth'
					/>
				</div>
				<div className='footer'>
					<button
						onClick={() => {
							setModalOpen(false);
						}}
						id='cancelBtn'
					>
						Cancel
					</button>
					<button onSubmit={handleAddUserSubmit}>Submit</button>
				</div>
			</div>
		</div>
	);
};
