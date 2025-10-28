import './EmployeeProfileContent.scss'

import { observer } from "mobx-react-lite"
import { ChangeEvent, useContext } from "react"
import IconProfile from '../../assets/icons/icon-profile.svg?react'
import IconBoxPercent from '../../assets/icons/icon-box-percent.svg?react'
import IconGithub from '../../assets/icons/icon-github.svg?react'
import IconGitlab from '../../assets/icons/icon-gitlab.svg?react'
import IconMessage from '../../assets/icons/icon-message.svg?react'
import IconMoney from '../../assets/icons/icon-money.svg?react'
import IconOutlineEmail from '../../assets/icons/icon-outline-email.svg?react'
import IconPercent from '../../assets/icons/icon-percent.svg?react'
import IconPhone from '../../assets/icons/icon-phone.svg?react'
import IconVirginmoney from '../../assets/icons/icon-virginmoney.svg?react'
import Skeleton from 'react-loading-skeleton'
import { PatternFormat, NumberFormatValues, NumericFormat } from 'react-number-format'
import { Input } from '../../components/Input/Input'
import { InfoComponent } from './components/InfoComponent/InfoComponent'
import { EmployeeProfileStateContext } from './state/EmployeeProfileStateContext'
import { EmployeeProfile } from '../../types/employee'

export const EmployeeProfileContent= observer(({
  editEmployeeAsync,
}: {
  editEmployeeAsync: () => unknown,
}) => {
  const employeeProfileState = useContext(EmployeeProfileStateContext)

  const {
    isLoading,
    isTriedToSubmit,
    isEdit,
    employeeProfile,
    initEmployeeProfile,
  } = employeeProfileState

  return (
    <div className="employee-profile">
      <div className="employee-profile__inner">
        <div className="employee-profile__box">
          <h2 className="employee-profile__head">
            General information
          </h2>
          {
            isLoading && (
              <Skeleton
                className="employee-profile__skeleton"
                count={2}
                containerTestId="loading-general-information"
              />
            )
          }
          {
            !isLoading && (
              <div>
                <InfoComponent
                  isHaveValue={!!employeeProfile.fullName}
                  value={employeeProfile.fullName}
                  label="Name"
                  icon={<IconProfile />}
                />
                <InfoComponent
                  isHaveValue={!!employeeProfile.corporateEmail}
                  value={employeeProfile.corporateEmail}
                  label="Corporate Email"
                  icon={<IconOutlineEmail />}
                />
              </div>
            )
          }
        </div>

        <div className="employee-profile__box">
          <div className="employee-profile__edit-box">
            <h2 className="employee-profile__head">
              Contacts
            </h2>
            {
              !isLoading && (
                <div className="employee-profile__buttons">
                  {
                    !isEdit 
                      ? (
                        <button
                          type="button"
                          className="employee-profile__button"
                          onClick={() => employeeProfileState.setIsEdit()}
                        >
                          Edit
                        </button>
                      ) 
                      : (
                        <>
                          <button
                            type="button"
                            className="employee-profile__button"
                            onClick={() => {
                              editEmployeeAsync()
                            }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="employee-profile__button"
                            onClick={() => {
                              employeeProfileState.resetIsEdit()
                              employeeProfileState.setEmployeeProfile({
                                employeeProfile: initEmployeeProfile as EmployeeProfile,
                              })
                              employeeProfileState.resetIsTriedToSubmit()
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                </div>
              )}

          </div>
          {
            isLoading && (
              <Skeleton
                className="employee-profile__skeleton"
                count={4}
                containerTestId="loading-contacts"
              />
            )
          }
          {
            !isLoading && (
              <div>
                <InfoComponent
                  isHaveValue={isEdit 
                    ? isEdit 
                    : !!(employeeProfile.phone && employeeProfile.phone.length > 9)}
                  value={(
                    <PatternFormat
                      className="employee-profile__contacts-info"
                      type="tel"
                      format="+7 (###) ### ## ##"
                      customInput={Input}
                      displayType={!isEdit ? `text` : `input`}
                      value={employeeProfile.phone}
                      onValueChange={(event: NumberFormatValues) => employeeProfileState.setEmployeeProfile({
                        employeeProfile: {
                          ...employeeProfile,
                          phone: event.value, 
                        },
                      })}
                      mask="_"
                      allowEmptyFormatting
                      valueIsNumericString
                    />
                  )}
                  isError={!(employeeProfile.phone && employeeProfile.phone.length > 9) && isTriedToSubmit}
                  label="Phone Number"
                  icon={<IconPhone />}
                />
                <InfoComponent
                  isHaveValue={isEdit 
                    ? isEdit 
                    : !!employeeProfile.personalEmail}
                  value={!isEdit
                    ? employeeProfile.personalEmail
                    : (
                      <Input
                        className="employee-profile__contacts-info"
                        value={employeeProfile.personalEmail || ``}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => employeeProfileState.setEmployeeProfile({
                          employeeProfile: {
                            ...employeeProfile,
                            personalEmail: event.target.value, 
                          },
                        })}
                      />
                    )}
                  label="Personal Email"
                  icon={<IconMessage />}
                />
                <InfoComponent
                  isHaveValue={isEdit
                    ? isEdit
                    : !!employeeProfile.gitHub}
                  value={!isEdit
                    ? employeeProfile.gitHub
                    : (
                      <div style={{
                        display: `flex`,
                        alignItems: `center`,
                      }}
                      >
                        @
                        <Input
                          className="employee-profile__contacts-info"
                          value={employeeProfile.gitHub || ``}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => employeeProfileState.setEmployeeProfile({
                            employeeProfile: {
                              ...employeeProfile,
                              gitHub: event.target.value, 
                            },
                          })}
                        />
                      </div>
                    )}
                  label="Personal GitHub"
                  icon={<IconGithub />}
                />
                <InfoComponent
                  isHaveValue={isEdit
                    ? isEdit
                    : !!employeeProfile.gitLab}
                  value={!isEdit
                    ? employeeProfile.gitLab
                    : (
                      <div style={{
                        display: `flex`,
                        alignItems: `center`,
                      }}
                      >
                        @
                        <Input
                          className="employee-profile__contacts-info"
                          value={employeeProfile.gitLab || ``}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => employeeProfileState.setEmployeeProfile({
                            employeeProfile: {
                              ...employeeProfile,
                              gitLab: event.target.value, 
                            },
                          })}
                        />
                      </div>
                    )}
                  label="Personal GitLab"
                  icon={<IconGitlab />}
                />
              </div>
            )
          }
        </div>

        <div className="employee-profile__box">
          <h2 className="employee-profile__head">Salary</h2>
          {
            isLoading && (
              <Skeleton
                className="employee-profile__skeleton"
                count={4}
                containerTestId="loading-salary"
              />
            )
          }
          {
            !isLoading && (
              <div>
                {employeeProfile.isSalaryInfoFilled
                  ? (
                    <>
                      <InfoComponent
                        isHaveValue={employeeProfile.fullSalary > 0}
                        value={(
                          <NumericFormat
                            type="text"
                            displayType="text"
                            value={employeeProfile.fullSalary}
                            valueIsNumericString
                            allowLeadingZeros
                            thousandSeparator=","
                            suffix=" ₽"
                          />
                        )}
                        label="Full Salary"
                        icon={<IconMoney />}
                      />
                      {employeeProfile.isEmployedOfficially && (
                        <InfoComponent
                          isHaveValue={employeeProfile.districtCoefficient > 0}
                          value={(
                            <NumericFormat
                              type="text"
                              displayType="text"
                              value={employeeProfile.districtCoefficient}
                              valueIsNumericString
                              allowLeadingZeros
                              style={{
                                color: `#1ED400`,
                              }}
                              prefix="+ "
                              thousandSeparator=","
                              suffix=" ₽"
                            />
                          )}
                          label="Distr. Coef. (15 %)"
                          icon={<IconPercent />}
                        />
                      )}
                      {employeeProfile.isEmployedOfficially && (
                        <InfoComponent
                          isHaveValue={employeeProfile.incomeTax > 0}
                          value={(
                            <NumericFormat
                              displayType="text"
                              value={employeeProfile.incomeTax}
                              valueIsNumericString
                              allowLeadingZeros
                              style={{
                                color: `#DA2228`,
                              }}
                              prefix="- "
                              allowNegative={false}
                              thousandSeparator=","
                              suffix=" ₽"
                            />
                          )}
                          label="Inc. Tax (13 %)"
                          icon={<IconBoxPercent />}
                        />
                      )}
                      {employeeProfile.isEmployedOfficially && (
                        <InfoComponent
                          isHaveValue={employeeProfile.netSalary > 0}
                          value={(
                            <NumericFormat
                              displayType="text"
                              value={employeeProfile.netSalary}
                              valueIsNumericString
                              thousandSeparator=","
                              suffix=" ₽"
                            />
                          )}
                          label="Net Salary"
                          icon={<IconVirginmoney />}
                        />
                      )}
                    </>
                  )
                  : (
                    <span style={{
                      opacity: 0.5, 
                    }}>
                      Your salary will be filled soon...
                    </span>
                  )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
})