import './EmployeeProfileContent.scss'

import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Input } from '../../components/Input/Input'
import { EmployeeProfileStateContext } from './state/EmployeeProfileStateContext'
import { SPECIALIZATIONS } from '../../common/constants/specializations'
import { Button } from '../../components/button/Button'
import { MultipleSelect } from '../../components/multiple-select/MultipleSelect'
import { Textarea } from '../../components/textarea/Textarea'
import { EmployeeProfile } from '../../types/employee'
import Avatar from '../../assets/images/avatar.png'
import IconBirthday from '../../assets/icons/icon-birthday.svg?react'

export const EmployeeProfileContent= observer(({
  editEmployeeAsync,
}: {
  editEmployeeAsync: () => unknown,
}) => {
  const employeeProfileState = useContext(EmployeeProfileStateContext)

  const {
    employeeProfile,
    errors,
    isSaving,
  } = employeeProfileState

  const {
    fullName,
    corporateEmail,
    birthDate,
    specializations,
    workerTime,
    phone,
    personalEmail,
    gitHub,
    gitLab,
  } = employeeProfile

  const {
    isPhoneError,
    isSpecializationsError,
  } = errors

  const handleFormChange = ({
    field,
    value,
  }: {
      field: keyof EmployeeProfile,
      value: string | number[],
    }) => {
    employeeProfileState.setEmployeeProfile({
      employeeProfile: {
        [field]: value, 
      },
    })
  }

  return (
    <section  
      className="employee-profile"
      data-cy="employee-profile"
    >
      <div className='employee-profile__wrapper'>
        <div className='employee-profile__avatar-container'>
          <div className='employee-profile__avatar'>
            <img
              src={Avatar}
              alt=""
            />
          </div>
        </div>
            
        <div className='employee-profile__info-container'>
          <div className='employee-profile__info'>
            <div className='employee-profile__personal-info'>
              <h2 className='employee-profile__fullname'>{fullName}</h2>
              <p className='employee-profile__corporate-email'>{corporateEmail}</p>
              <p className='employee-profile__birth-date'>
                <IconBirthday />
                {birthDate || `-`}
              </p>
            </div>

            <ul>
              <li className="employee-profile__group">
                <div className="employee-profile__field">
                  <MultipleSelect
                    label='Specialization*'
                    placeholder="Choose the specialization"
                    value={specializations}
                    options={SPECIALIZATIONS}
                    isInvalid={isSpecializationsError}
                    onChange={(selectedOptions) => 
                      handleFormChange({
                        field: `specializations`,
                        value: selectedOptions.map(({
                          value,
                        }) => value ,
                        ) as number[],
                      },
                      )
                    }
                    data-cy='specializations-multiple-select'
                  />
                </div>
              </li>

              <li className="employee-profile__group">
                <div className="employee-profile__field employee-profile__field--high">
                  <Textarea
                    className='employee-profile__text'
                    placeholder="Enter the worker time"
                    label='Worker Time'
                    value={workerTime || ``}
                    onChange={(e) => handleFormChange({
                      field: `workerTime`,
                      value: e.target.value,
                    })}
                    data-cy='worker-time-input'
                  />
                </div>
              </li>

              <li className="employee-profile__group">
                <div className="employee-profile__field">
                  <Input
                    label='Phone Number*'
                    mask="+7 (999) 999-99-99"
                    placeholder="+7 (___) ___-__-__"
                    value={phone || ``}
                    isInvalid={isPhoneError}
                    onChange={(e) => employeeProfileState.setPhone({
                      phone: e.target.value,
                    })}
                    data-cy='phone-input'
                  />
                </div>

                <div className="employee-profile__field">
                  <Input
                    type='email'
                    label='Personal Email*'
                    placeholder='Enter the personal email'
                    value={personalEmail || ``}
                    onChange={(e) => handleFormChange({
                      field: `personalEmail`,
                      value: e.target.value,
                    })}
                    data-cy='personal-email-input'
                  />
                </div>
              </li>
              
              <li className="employee-profile__group">
                <div className="employee-profile__field">
                  <Input
                    label='Personal GitHub'
                    placeholder='Enter the username'
                    value={gitHub || ``}
                    onChange={(e) => handleFormChange({
                      field: `gitHub`,
                      value: e.target.value,
                    })}
                    data-cy='github-input'
                  />
                </div>

                <div className="employee-profile__field">
                  <Input
                    label='Personal GitLab'
                    placeholder='Enter the username'
                    value={gitLab || ``}
                    onChange={(e) => handleFormChange({
                      field: `gitLab`,
                      value: e.target.value,
                    })}
                    data-cy='gitlab-input'
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="employee-profile__action-button">
            <Button
              type="button"
              isAccent
              onClick={editEmployeeAsync}
              className="employee-profile__button"
              label={isSaving 
                ? `Saving` 
                : `Save Changes`}
              isDisable={isSaving}
              isLoader={isSaving}
              data-cy='save-button'
            />
          </div>
        </div>
      </div>
    </section>
  )
})