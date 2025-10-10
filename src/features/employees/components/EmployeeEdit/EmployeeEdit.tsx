/* eslint-disable no-extra-boolean-cast */
import './EmployeeEdit.scss'

import { useEffect, useState, ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import { NumberFormatValues } from 'react-number-format'

import { toast } from 'react-toastify'
import IconProfile from '../../../../assets/icons/icon-profile.svg?react'
import IconMail from '../../../../assets/icons/icon-message.svg?react'
import { api } from '../../../../common/api'
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config'
import { EditedEmployee } from '../../types'

import { CustomDatePicker } from './components/CustomDatePicker/CustomDatePicker'
import { CustomNumberFormat } from './components/CustomNumberFormat/CustomNumberFormat'
import { CustomPatternFormat } from './components/CustomPatternFormat/CustomPatternFormat'
import { Input } from '../../../../components/Input/Input'
import { CheckField } from '../../../../components/CheckField/CheckField'

// const employeeStatusData = {
//   current: 'Current/Active',
//   fired: 'Fired',
// };

const employeeTypeData = {
  1: `Full time`,
  0.5: `Half time`,
}

const employedData = {
  officially: `Officially`,
  freelance: `Freelance`,
}

export function EmployeeEdit() {

  const [
    triedToSubmit,
    setTriedToSubmit,
  ] = useState(false)
  const [
    employee,
    setEmployee,
  ] = useState<EditedEmployee>({
    fullName: ``,
    corporateEmail: ``,
    personalEmail: null,
    phone: null,
    gitHub: null,
    gitLab: null,
    ratePerHour: 0,
    fullSalary: null,
    employmentType: null,
    parking: 0,
    hireDate: null,
    dismissalDate: new Date(),
    isEmployedOfficially: true,
    isCurrentEmployee: true,
    personnelNumber: ``,
  })

  const [
    param,
  ] = useSearchParams()
  const id = param.get(`id`)

  useEffect(() => {
    loadEmployeeAsync()
  }, [])

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, 
    } = event.target

    const updatedForm: EditedEmployee = {
      ...employee,
      [name]: value,
    }

    setEmployee(updatedForm)
  }

  return (
    <section className="employee-edit">
      <h1 className="heading employee-edit__title">Employee Profile</h1>
      <div className="employee-edit__info">
        <span className="employee-edit__icon">
          <IconProfile />
        </span>
        {employee.fullName}
      </div>
      <div className="employee-edit__info">
        <span className="employee-edit__icon">
          <IconMail />
        </span>
        {employee.corporateEmail}
      </div>

      <h2>Contacts</h2>
      <ul>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Phone Number*</span>
          <CustomPatternFormat
            className="employee-edit__control"
            type="tel"
            format="+7 (###) ### ## ##"
            value={employee.phone}
            isInvalid={!(employee.phone && employee.phone.length > 9) && triedToSubmit}
            onChange={(event: NumberFormatValues) => setEmployee({
              ...employee,
              phone: event.value, 
            })}
          />
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Personal Email</span>
          <Input
            name="personalEmail"
            placeholder="email@mail.ru"
            className="employee-edit__control"
            value={employee.personalEmail || ``}
            onChange={handleFormChange}
          />
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Personal GitHub</span>
          <div className="employee-edit__git employee-edit__control">
            <span className="employee-edit__symbol">@</span>
            <Input
              className="employee-edit__control"
              name="gitHub"
              placeholder="gitHub"
              value={employee.gitHub || ``}
              onChange={handleFormChange}
            />
          </div>
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Personal GitLab</span>
          <div className="employee-edit__git employee-edit__control">
            <span className="employee-edit__symbol">@</span>
            <Input
              className="employee-edit__control"
              name="gitLab"
              placeholder="gitLab"
              value={employee.gitLab || ``}
              onChange={handleFormChange}
            />
          </div>
        </li>
      </ul>

      <h2>Salary</h2>
      <ul>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Rate Per Hour *</span>
          <div className="employee-edit__control">
            <CustomNumberFormat
              value={employee.ratePerHour || 0}
              isInvalid={!(employee.ratePerHour! >= 0) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({
                ...employee,
                ratePerHour: Number(event.value), 
              })}
            />
          </div>
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Full Salary *</span>
          <div className="employee-edit__control">
            <CustomNumberFormat
              value={employee.fullSalary || ``}
              isInvalid={!Boolean(employee.fullSalary) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({
                ...employee,
                fullSalary: Number(event.value), 
              })}
            />
          </div>
        </li>
        <li className="employee-edit__item employee-edit__item--radio-list">
          <span className="employee-edit__label">Employment Type *</span>
          <div className="employee-edit__control">
            {Object.entries(employeeTypeData)
              .map(([
                value,
                label,
              ]) => {
                const employmentTypeValue = employee.employmentType === null || employee.employmentType === 1 ? `1` : `0.5`

                return (
                  <CheckField
                    key={value}
                    style={{
                      marginBottom: 16,
                    }}
                    viewType="radio"
                    label={label}
                    checked={value === employmentTypeValue}
                    onChange={() => setEmployee({
                      ...employee,
                      employmentType: Number(value), 
                    })}
                  />
                )
              })}
          </div>
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Parking *</span>
          <div className="employee-edit__control">
            <CustomNumberFormat
              value={employee.parking || 0}
              isInvalid={!(employee.parking! >= 0) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({
                ...employee,
                parking: Number(event.value), 
              })}
            />
          </div>
        </li>
      </ul>

      <h2>Documents</h2>
      <ul>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Hire Date *</span>
          <div className="employee-edit__control">
            <CustomDatePicker
              date={employee.hireDate}
              isInvalid={!Boolean(employee.hireDate) && triedToSubmit}
              onChange={(date: Date) => setEmployee({
                ...employee,
                hireDate: date, 
              })}
            />
          </div>
        </li>
        {/* <li className="employee-edit__item employee-edit__item--radio-list">
          <span className="employee-edit__label">Employee Status *</span>
          <div>
            {Object.entries(employeeStatusData).map(([value, label]) => {
              const valueEmployedFired = employee.isCurrentEmployee ? 'current' : 'fired';

              return (
                <CheckField
                  key={value}
                  style={{
                    marginBottom: 16,
                  }}
                  viewType="radio"
                  label={label}
                  checked={value === valueEmployedFired}
                  onChange={() => setEmployee({ ...employee, isCurrentEmployee: value === 'current' })}
                />
              );
            })}
          </div>
        </li>
        {!employee.isCurrentEmployee && (
          <li className="employee-edit__item">
            <span className="employee-edit__label">Date of Dismissal *</span>
            <div className="employee-edit__control">
              <CustomDatePicker
                date={employee.dismissalDate}
                isInvalid={!Boolean(employee.dismissalDate) && triedToSubmit}
                onChange={(date: Date) => setEmployee({ ...employee, dismissalDate: date })}
              />
            </div>
          </li>
        )} */}
        <li className="employee-edit__item employee-edit__item--radio-list">
          <span className="employee-edit__label">Employed *</span>
          <div>
            {Object.entries(employedData)
              .map(([
                value,
                label,
              ]) => {
                const valueEmployedOfficially = employee.isEmployedOfficially ? `officially` : `freelance`

                return (
                  <CheckField
                    key={value}
                    style={{
                      marginBottom: 16,
                    }}
                    viewType="radio"
                    label={label}
                    checked={value === valueEmployedOfficially}
                    onChange={() => setEmployee({
                      ...employee,
                      isEmployedOfficially: value === `officially`, 
                    })}
                  />
                )
              })}
          </div>
        </li>
        {employee.isEmployedOfficially && (
          <li className="employee-edit__item">
            <span className="employee-edit__label">Personnel Number *</span>
            <CustomPatternFormat
              className="employee-edit__control"
              format="##/##"
              value={employee.personnelNumber}
              isInvalid={!(employee.personnelNumber && employee.personnelNumber.length >= 4) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({
                ...employee,
                personnelNumber: event.value, 
              })}
            />
          </li>
        )}
      </ul>

      <div className="employee-edit__box-buttons">
        <button
          type="button"
          onClick={() => window.location.href = `/employees`}
          className="employee-edit__button"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => updateEmployeesAsync()}
          className="employee-edit__button"
        >
          Save Changes
        </button>
      </div>
    </section>
  )

  async function loadEmployeeAsync() {
    const {
      data, 
    } = await api.get<EditedEmployee>(`${LINK_TO_SALARY_SERVICE}employees/${id}`)

    const initialData = {
      ...data,
      phone: data.phone ? data.phone.split(``)
        .slice(2)
        .join(``) : null,
      hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
      dismissalDate: data.dismissalDate ? new Date(data.dismissalDate) : new Date(),
      personnelNumber: data.personnelNumber ? data.personnelNumber.replace(`/`, ``) : data.personnelNumber,
    }

    setEmployee(initialData)
  }

  async function updateEmployeesAsync() {
    const updateEmployee = {
      ...employee,
      employmentType: employee.employmentType === null ? 1 : employee.employmentType,
      phone: `+7${employee.phone}`,
      ratePerHour: employee.ratePerHour || 0,
      parking: employee.parking || 0,
      personnelNumber: employee.isEmployedOfficially ? `${employee.personnelNumber?.substring(0, 2)}/${employee.personnelNumber?.substring(2, 4)}` : null,
    }

    delete updateEmployee.dismissalDate

    setTriedToSubmit(true)

    const isValidPersonnelNumber = employee.isEmployedOfficially ? employee.personnelNumber!.length >= 4 : true

    if (updateEmployee.phone.length > 9 && isValidPersonnelNumber) {
      try {
        await api.put<EditedEmployee>(`${LINK_TO_SALARY_SERVICE}employees/update`, updateEmployee)

        setTriedToSubmit(false)
        window.location.href =`/employees`
      }
      catch (e:any) {
        toast.error(e.message)
      }
    }
  }
}
