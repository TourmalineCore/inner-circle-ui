import { getProfileInfo } from '../utils/utilsForTests';
import { ProfileState } from './ProfileState';

const EMPLOYEE = getProfileInfo({});

describe('ProfileState', () => {
  let profileState: ProfileState;

  beforeEach(() => {
    profileState = new ProfileState();
  });

  it(`
  GIVEN isEdit flag 
  WHEN use method setIsEdit
  THEN value isSent changed
  `, () => {
    profileState.setIsEdit(false);
    expect(profileState.isEdit).to.eq(false);
    profileState.setIsEdit(true);
    expect(profileState.isEdit).to.eq(true);
  });

  it(`
  GIVEN isLoading flag 
  WHEN use method setIsLoading
  THEN value isLoading changed
  `, () => {
    profileState.setIsLoading(false);
    expect(profileState.isLoading).to.eq(false);
    profileState.setIsLoading(true);
    expect(profileState.isLoading).to.eq(true);
  });

  it(`
  GIVEN triedToSubmit flag 
  WHEN use method setTriedToSubmit
  THEN value triedToSubmit changed
  `, () => {
    profileState.setTriedToSubmit(false);
    expect(profileState.triedToSubmit).to.eq(false);
    profileState.setTriedToSubmit(true);
    expect(profileState.triedToSubmit).to.eq(true);
  });

  it(`
  GIVEN employee info
  WHEN initialize
  THEN initialize employee info
  `, () => {
    profileState.initialize({ employee: EMPLOYEE });
    expect(profileState.employeeInfo).to.deep.equal(EMPLOYEE);
  });

  it(`
  GIVEN employee info
  WHEN use method setEmployee
  THEN set employee info
  `, () => {
    profileState.setEmployee(EMPLOYEE);
    expect(profileState.employeeInfo).to.deep.equal(EMPLOYEE);
  });
});
