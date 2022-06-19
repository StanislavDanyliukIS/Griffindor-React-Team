import './EditField.scss';

export const EditField = ({
	editFormData,
	handleEditFormChange,
	handleEditFormSubmit,
	handleCancelClick,
}) => {


	return (
		<tr className={'theme'}>
			<td className={'w-15'}>
				<input
					className='form-control user-form'
					type='text'
					name='index'
					value={editFormData.index}
					required='required'
					placeholder='Name'
					disabled
					onChange={handleEditFormChange}
				/>
			</td>
			<td className={'w-15'}>
				<input
					className='form-control user-form'
					type='text'
					name='name'
					value={editFormData.name}
					required='required'
					placeholder='Name'
					onChange={handleEditFormChange}
				/>
			</td>
			<td className={'w-15'}>
				<input
					className='form-control user-form'
					type='email'
					name='email'
					value={editFormData.email}
					required='required'
					placeholder='Email'
					onChange={handleEditFormChange}
				/>
			</td>
			<td className={'w-15'}>
				<input
					className='form-control user-form'
					type='text'
					name='telephone'
					value={editFormData.telephone}
					required='required'
					placeholder='Telephone'
					onChange={handleEditFormChange}
				/>
			</td>
			<td className={'w-10'}>
				<input
					className='form-control user-form'
					type='text'
					name='organization'
					value={editFormData.organization}
					required='required'
					placeholder='Company'
					onChange={handleEditFormChange}
				/>
			</td>
			{editFormData.score &&
				<td className={'w-15'}>
					<input
						className='form-control user-form'
						type='number'
						name='score'
						value={editFormData.score}
						required='required'
						placeholder='Score'
						onChange={handleEditFormChange}
					/>
				</td>
			}
			<td className={'w-15'}>
				<input
					className='form-control user-form'
					type='date'
					name='birthday'
					value={editFormData.birthday}
					required='required'
					placeholder='Date of birth'
					onChange={handleEditFormChange}
				/>
			</td>
			<td className='table-btn table-text-content'>
				<button
					onClick={handleEditFormSubmit}
					type='button'
					className='btn btn-outline-success btn-edit'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-check-square'
						viewBox='0 0 16 16'
					>
						<path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
						<path d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z' />
					</svg>
				</button>
			</td>
			<td className='table-btn'>
				<button
					onClick={handleCancelClick}
					type='button'
					className='btn btn-outline-danger btn-delete'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-x-square'
						viewBox='0 0 16 16'
					>
						<path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
						<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
					</svg>
				</button>
			</td>
		</tr>
	);
};
