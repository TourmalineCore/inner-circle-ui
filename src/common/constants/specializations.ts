export enum Specialization {
  FRONTEND = 1,
  BACKEND = 2,
  ML = 3,
  DEVOPS = 4,
  QA = 5,
  DESIGN = 6,
  MANAGEMENT = 7,
  EMBEDDED = 8,
}

export const SPECIALIZATION_LABELS: Record<Specialization, string> = {
  [Specialization.FRONTEND]: `Frontend`,
  [Specialization.BACKEND]: `Backend`,
  [Specialization.ML]: `ML`,
  [Specialization.DEVOPS]: `DevOps`,
  [Specialization.QA]: `QA`,
  [Specialization.DESIGN]: `Design`,
  [Specialization.MANAGEMENT]: `Management`,
  [Specialization.EMBEDDED]: `Embedded`,
}

export const SPECIALIZATIONS = Object.values(Specialization)
  .filter(value => typeof value === `number`)
  .map(value => ({
    value: value as number,
    label: SPECIALIZATION_LABELS[value as Specialization],
  }))