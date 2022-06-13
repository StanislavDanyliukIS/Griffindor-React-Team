import './ModalEvent.scss';

export const ModalEvent = ({
	handleClearForm,
	handleAddFormSubmit,
	handleAddFormChange,
	formData,
}) => {
	return (
		<div
			className='modal fade'
			id='exampleModalCenter'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='exampleModalCenterTitle'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='exampleModalLongTitle'>
							Create new event
						</h5>

						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
							onClick={handleClearForm}
						>
							<span className='close-btn-header' aria-hidden='true'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='28'
									height='28'
									fill='currentColor'
									className='bi bi-x'
									viewBox='0 0 16 16'
								>
									<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
								</svg>
							</span>
						</button>
					</div>
					<div className='modal-body'>
						<div className='form-group'>
							<label htmlFor='event-name' className='col-form-label'>
								Event name:
							</label>
							<input
								className='form-control user-form'
								id='event-name'
								type='text'
								name='name'
								value={formData.name}
								required='required'
								placeholder='Name'
								onChange={handleAddFormChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='event-score' className='col-form-label'>
								Score:
							</label>
							<input
								className='form-control user-form'
								id='event-score'
								type='number'
								min='0'
								name='score'
								value={formData.score}
								required='required'
								placeholder='Points'
								onChange={handleAddFormChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='event-date' className='col-form-label'>
								Date:
							</label>
							<input
								className='form-control user-form'
								id='event-date'
								type='date'
								name='date'
								value={formData.date}
								required='required'
								placeholder='Date of birth'
								onChange={handleAddFormChange}
							/>
						</div>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={handleClearForm}
							data-dismiss='modal'
						>
							Close
						</button>
						<button
							type='submit'
							className='btn btn-primary'
							data-dismiss='modal'
							onClick={handleAddFormSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
		// <div className='modalBackground'>
		// 	<div className='modalContainer'>
		// 		<div className='titleCloseBtn'>
		// 			<button
		// 				onClick={() => {
		// 					setModalOpen(false);
		// 					setFormData(initValue);
		// 				}}
		// 			>
		// 				<svg
		// 					xmlns='http://www.w3.org/2000/svg'
		// 					width='16'
		// 					height='16'
		// 					fill='currentColor'
		// 					className='bi bi-x'
		// 					viewBox='0 0 16 16'
		// 				>
		// 					<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
		// 				</svg>
		// 			</button>
		// 		</div>

		// 		<div className='body'>
		// 			<input
		// 				className='form-control user-form'
		// 				type='text'
		// 				name='name'
		// 				required='required'
		// 				placeholder='Name'
		// 				onChange={handleAddFormChange}
		// 			/>

		// 			<input
		// 				className='form-control user-form'
		// 				type='number'
		// 				name='score'
		// 				required='required'
		// 				placeholder='Points'
		// 				onChange={handleAddFormChange}
		// 			/>

		// 			<input
		// 				className='form-control user-form'
		// 				type='date'
		// 				name='date'
		// 				required='required'
		// 				placeholder='Date of birth'
		// 				onChange={handleAddFormChange}
		// 			/>
		// 		</div>
		// 		<div className='footer'>
		// 			<button
		// 				className='btn btn-danger footer-btn'
		// 				onClick={() => {
		// 					setModalOpen(false);
		// 					setFormData(initValue);
		// 				}}
		// 			>
		// 				Cancel
		// 			</button>
		// 			<button
		// 				className='btn btn-primary footer-btn'
		// 				type='submit'
		// 				onClick={handleAddFormSubmit}
		// 			>
		// 				Submit
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
	);
};
