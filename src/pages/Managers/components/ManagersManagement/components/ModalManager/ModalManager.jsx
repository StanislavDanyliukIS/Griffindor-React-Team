import './ModalManager.scss';

export const ModalManager = ({
	// handleClearForm,
	handleAddFormSubmit,
	handleAddFormChange,
}) => {
	return (
		<div
			className='modal fade'
			id='ModalCreateManager'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='ModalCreateManagerCenterTitle'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='ModalCreateManagerCenterTitle'>
							Create new manager
						</h5>

						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
							// onClick={handleClearForm}
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
								Manager name:
							</label>
							<input
								className='form-control user-form'
								id='event-name'
								type='text'
								name='name'
								// value={formData.name}
								required='required'
								placeholder='Name'
								onChange={handleAddFormChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='event-name' className='col-form-label'>
								Manager email:
							</label>
							<input
								className='form-control user-form'
								id='event-name'
								type='email'
								name='email'
								// value={formData.email}
								required='required'
								placeholder='Email'
								onChange={handleAddFormChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='event-name' className='col-form-label'>
								Manager phone number:
							</label>
							<input
								className='form-control user-form'
								id='event-phone'
								type='phone'
								name='telephone'
								// value={formData.email}
								required='required'
								placeholder='Telephone'
								onChange={handleAddFormChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='event-name' className='col-form-label'>
								Manager company name:
							</label>
							<input
								className='form-control user-form'
								id='event-company'
								type='text'
								name='organization'
								// value={formData.email}
								required='required'
								placeholder='Company'
								onChange={handleAddFormChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='event-date' className='col-form-label'>
								Manager birthday:
							</label>
							<input
								className='form-control user-form'
								id='event-date'
								type='date'
								name='birthday'
								// value={formData.date}
								required='required'
								placeholder='Date of birth'
								onChange={handleAddFormChange}
							/>
						</div>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-outline-secondary'
							// onClick={handleClearForm}
							data-dismiss='modal'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='btn btn-outline-primary'
							data-dismiss='modal'
							onClick={handleAddFormSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
