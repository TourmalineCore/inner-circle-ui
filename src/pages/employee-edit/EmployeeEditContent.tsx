import './EmployeeEdit.scss'

import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { EmployeeEditStateContext } from './state/EmployeeEditStateContext'
import { EditedEmployee } from '../../types/employee'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/button/Button'
import { Textarea } from '../../components/textarea/Textarea'
import { MultipleSelect } from '../../components/multiple-select/MultipleSelect'
import IconRabbit from '../../assets/icons/icon-rabbit.svg'
import { SPECIALIZATIONS } from '../../common/constant'

export const EmployeeEditContent = observer(({
  updateEmployeesAsync,
}: {
  updateEmployeesAsync: () => unknown,
}) => {
  const employeeEditState = useContext(EmployeeEditStateContext)

  const {
    employee,
    isTriedToSubmit,
  } = employeeEditState

  const handleFormChange = ({
    field,
    value,
  }: {
    field: keyof EditedEmployee,
    value: string | string[],
  }) => {
    employeeEditState.setEmployee({
      employee: {
        [field]: value, 
      },
    })
  }

  return (
    <section  
      className="employee-edit"
      data-cy="employee-edit"
    >
      <div className='employee-edit__wrapper'>
        <h1 className="employee-edit__title">
          Edit Employee Profile
        </h1>
        <div className='employee-edit__info'>
          <div className='employee-edit__profile-header'>
            <div className='employee-edit__avatar-container'>
              <div className='employee-edit__default-avatar'>
                <img
                  src={IconRabbit}
                  alt=""
                />
              </div>
            </div>
           
            <div className='employee-edit__personal-info'>
              <h2 className='employee-edit__fullname'>{employee.fullName}</h2>
              <p className='employee-edit__corporate-email'>{employee.corporateEmail}</p>
            </div>
          </div>

          <ul>
            <li className="employee-edit__group">
              <div className="employee-edit__field employee-edit__field--birth-date">
                <Input
                  label='Birth Date*'
                  placeholder="DD/MM/YYYY"
                  mask='99/99/9999'
                  value={employee.birthDate || ``}
                  onChange={(e) => handleFormChange({
                    field: `birthDate`,
                    value: e.target.value,
                  })}
                />
              </div>

              <div className="employee-edit__field">
                <MultipleSelect
                  label='Specialization*'
                  placeholder="Choose the specialization"
                  value={employee.specialization}
                  options={SPECIALIZATIONS}
                  onChange={(selectedOptions) => 
                    handleFormChange({
                      field: `specialization`,
                      value: selectedOptions.map(({
                        value,
                      }) => value,
                      ),
                    },
                    )
                  }
                />
              </div>
            </li>

            <li className="employee-edit__group">
              <div className="employee-edit__field employee-edit__field--high">
                <Textarea
                  className='employee-edit__text'
                  placeholder="Enter the worker time"
                  label='Worker Time'
                  value={employee.workedTime || ``}
                  onChange={(e) => handleFormChange({
                    field: `workedTime`,
                    value: e.target.value,
                  })}
                />
              </div>
            </li>

            <li className="employee-edit__group">
              <div className="employee-edit__field">
                <Input
                  label='Phone Number*'
                  mask="+7 (999) 999-99-99"
                  placeholder="+7 (___) ___-__-__"
                  value={employee.phone || ``}
                  isInvalid={!(employee.phone && employee.phone.length > 9) && isTriedToSubmit}
                  onChange={(e) => handleFormChange({
                    field: `phone`,
                    value: e.target.value,
                  })}
                />
              </div>

              <div className="employee-edit__field">
                <Input
                  type='email'
                  label='Personal Email*'
                  placeholder='Enter the personal email'
                  value={employee.personalEmail || ``}
                  onChange={(e) => handleFormChange({
                    field: `personalEmail`,
                    value: e.target.value,
                  })}
                />
              </div>
            </li>
              
            <li className="employee-edit__group">
              <div className="employee-edit__field">
                <Input
                  label='Personal GitHub'
                  placeholder='Enter the username'
                  value={employee.gitHub || ``}
                  onChange={(e) => handleFormChange({
                    field: `gitHub`,
                    value: e.target.value,
                  })}
                />
              </div>

              <div className="employee-edit__field">
                <Input
                  label='Personal GitLab'
                  placeholder='Enter the username'
                  value={employee.gitLab || ``}
                  onChange={(e) => handleFormChange({
                    field: `gitLab`,
                    value: e.target.value,
                  })}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="employee-edit__action-buttons">
          <Button
            type="button"
            onClick={() => window.location.href = `/employees`}
            className="employee-edit__button"
            label={`Cancel`}
          />

          <Button
            type="button"
            isAccent
            onClick={() => updateEmployeesAsync()}
            className="employee-edit__button"
            label={`Save Changes`}
          />
        </div>
      </div>
    </section>
  )
})