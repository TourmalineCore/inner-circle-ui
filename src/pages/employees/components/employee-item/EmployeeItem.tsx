import './EmployeeItem.scss'

import IconPhone from '../../../../assets/icons/icon-phone.svg?react'
import IconBirthday from '../../../../assets/icons/icon-birthday.svg?react'
import IconClock from '../../../../assets/icons/icon-clock.svg?react'
import IconEdit from '../../../../assets/icons/icon-edit.svg?react'
import Avatar from '../../../../assets/images/avatar.png'

import { Button } from '../../../../components/button/Button'
import { hasAccessPermission } from '../../../../common/utils/tokenUtils'
import { Employee } from '../../../../types/employee'
import { CopyToClipboard } from '../../../../components/copy-to-clipboard/CopyToClipboard'
import { PatternFormat } from 'react-number-format'
import { Specialization, SPECIALIZATION_LABELS } from '../../../../common/constants/specializations'
import { observer } from 'mobx-react-lite'

const EMPTY_VALUE = `-`

export const EmployeeItem = observer(({
  employee,
}: {
  employee: Employee,
}) => {

  const {
    fullName,
    corporateEmail,
    personalEmail,
    gitHub,
    gitLab,
    employeeId,
    phone,
    birthDate,
    specializations,
    workerTime,
  } = employee

  return (
    <div
      key={employeeId}
      className='employee-item'
    >
      {
        hasAccessPermission({
          permission: `EditFullEmployeesData`,
        })
          && <Button
            className="employee-item__button"
            label={
              <>
                <IconEdit /> Edit
              </>
            }
            isAccent
            onClick={() => {
              window.location.href =`/employees/edit?id=${employee.employeeId}`
            }}
          />
      }
        
      <div className="employee-item__header">
        <div className="employee-item__avatar-container">
          <img
            src={Avatar}
            alt=""
          />
        </div>

        <div className="employee-item__info">
          <div className="employee-item__fullname">
            {fullName}
          </div>

          <div className="employee-item__specializations">
            {
              specializations.length > 0 
                ? specializations
                  .map((spec: Specialization) => SPECIALIZATION_LABELS[spec])
                  .join(`, `)
                : EMPTY_VALUE
            }
          </div>

          <div className="employee-item__corporate-email">
            <CopyToClipboard
              text={corporateEmail}
              className='employee-item__corporate-email'
            />
          </div>

          <div className="employee-item__details">
            <div className="employee-item__detail-item">
              <IconBirthday />
              {birthDate || EMPTY_VALUE}
            </div>

            <div className="employee-item__detail-item">
              <IconClock />
              {workerTime || EMPTY_VALUE}
            </div>

            <div
              className="employee-item__detail-item"
            >
              <IconPhone />
              {
                phone
                  ? <CopyToClipboard
                    text={phone}
                    className="employee-item__phone"
                  >
                    <PatternFormat
                      displayType="text"
                      format="+7 (###) ### ## ##"
                      value={phone.substring(2)}
                    />
                  </CopyToClipboard>
                  : EMPTY_VALUE
              }
            </div>
          </div>
        </div>
      </div>

      <div className="employee-item__footer">
        <div className="employee-item__footer-item">
          <div className="employee-item__footer-label">
            Personal Email
          </div>
          <div className="employee-item__footer-value">
            {
              personalEmail
                ? <CopyToClipboard text={personalEmail} />
                : EMPTY_VALUE
            }
          </div>
        </div>
        
        <div className="employee-item__footer-item">
          <div className="employee-item__footer-label">
            Personal GitHub
          </div>
          <div className="employee-item__footer-value">
            {formatLink({
              value: gitHub,
              baseUrl: `https://github.com/`,
            })}
          </div>
        </div>

        <div className="employee-item__footer-item">
          <div className="employee-item__footer-label">
            Personal GitLab
          </div>
          <div className="employee-item__footer-value">
            {formatLink({
              value: gitLab,
              baseUrl: `https://gitlab.com/`,
            })}
          </div>
        </div>
      </div>
    </div>
  )

  function formatLink({
    value,
    baseUrl,
  }: {
    value: string | null,
    baseUrl: string,
  }) {
    if (!value) return EMPTY_VALUE

    return (
      <a href={`${baseUrl}${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="employee-item__link"
      >
        {value}
      </a>
    )
  }
})
