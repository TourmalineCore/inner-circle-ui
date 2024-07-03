import { NumericFormat } from 'react-number-format';
import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { InfoCard } from '../components/info-card/InfoCard';
import { ReactComponent as IconMoney } from '../../../../assets/icons/icon-money.svg';
import { ReactComponent as IconPercent } from '../../../../assets/icons/icon-percent.svg';
import { ReactComponent as IconBoxPercent } from '../../../../assets/icons/icon-box-percent.svg';
import { ReactComponent as IconVirginmoney } from '../../../../assets/icons/icon-virginmoney.svg';
import { ProfileStateContext } from '../../state/ProfileStateContext';

export const SalaryInfo = observer(() => {
  const profileState = useContext(ProfileStateContext);

  const employee = profileState.employeeInfo;

  return (
    <div className="profile__box">
      <h2 className="profile__head">Salary</h2>
      {
        profileState.isLoading ? (
          <Skeleton
            className="profile__skeleton"
            count={4}
            containerTestId="loading-salary"
          />
        ) : (
          <div>
            {
              employee.isSalaryInfoFilled ? (
                <>
                  <InfoCard
                    isHaveValue={employee.fullSalary > 0}
                    value={(
                      <NumericFormat
                        type="text"
                        displayType="text"
                        value={employee.fullSalary}
                        valueIsNumericString
                        allowLeadingZeros
                        thousandSeparator=","
                        suffix=" ₽"
                      />
                    )}
                    label="Full Salary"
                    icon={<IconMoney />}
                  />
                  {
                    employee.isEmployedOfficially && (
                      <InfoCard
                        isHaveValue={employee.districtCoefficient > 0}
                        value={(
                          <NumericFormat
                            type="text"
                            displayType="text"
                            value={employee.districtCoefficient}
                            valueIsNumericString
                            allowLeadingZeros
                            style={{
                              color: '#1ED400',
                            }}
                            prefix="+ "
                            thousandSeparator=","
                            suffix=" ₽"
                          />
                        )}
                        label="District Coefficient (15 %)"
                        icon={<IconPercent />}
                      />
                    )
                  }
                  {
                    employee.isEmployedOfficially && (
                      <InfoCard
                        isHaveValue={employee.incomeTax > 0}
                        value={(
                          <NumericFormat
                            displayType="text"
                            value={employee.incomeTax}
                            valueIsNumericString
                            allowLeadingZeros
                            style={{
                              color: '#DA2228',
                            }}
                            prefix="- "
                            thousandSeparator=","
                            suffix=" ₽"
                          />
                        )}
                        label="Income Tax (13 %)"
                        icon={<IconBoxPercent />}
                      />
                    )
                  }
                  {
                    employee.isEmployedOfficially && (
                      <InfoCard
                        isHaveValue={employee.netSalary > 0}
                        value={(
                          <NumericFormat
                            displayType="text"
                            value={employee.netSalary}
                            valueIsNumericString
                            thousandSeparator=","
                            suffix=" ₽"
                          />
                        )}
                        label="Net Salary"
                        icon={<IconVirginmoney />}
                      />
                    )
                  }
                </>
              ) : (
                <span style={{ opacity: 0.5 }}>
                  Your salary will be filled soon..
                </span>
              )
            }
          </div>
        )
      }
    </div>
  );
});
