import { times } from 'lodash-es'
import { faker } from '@faker-js/faker'

export const columns = [
  { key: 'Id', label: 'Id', hidden: true },
  { key: 'ProjectNumber', label: 'Project Number', hidden: false },
  { key: 'ClaimNumber', label: 'Claim Number', hidden: true },
  { key: 'Account', label: 'Account' },
  { key: 'FlaggedBy', label: 'Flagged By', hidden: true },
  { key: 'InspectionDate', label: 'Inspection Date', hidden: true },
  { key: 'InspectionStart', label: 'Inspection Start', hidden: true },
  { key: 'InspectionFinish', label: 'Inspection Finish', hidden: true },
  { key: 'InsAdj', label: 'Adjuster' },
  { key: 'ServiceType', label: 'Service Type', hidden: true },
  { key: 'City', label: 'City', hidden: true },
  { key: 'State', label: 'State', hidden: true },
  { key: 'PostalCode', label: 'Zip Code' },
  { key: 'ServiceTech', label: 'Technician' },
  { key: 'Territory', label: 'Territory', hidden: true },
  { key: 'Area', label: 'Area', hidden: true },
  { key: 'Status', label: 'Status', hidden: true },
  { key: 'actions', label: 'Actions' },
]

export const projects = times(50, (n) => {
  const created_on = faker.date.recent()

  return {
    id: n + 1,
    ProjectNumber: n + 202307000 + 1,
    ClaimNumber: faker.string.alphanumeric({
      length: { min: 5, max: 10 },
      casing: 'upper',
    }),
    Account: faker.helpers.arrayElement([
      'Allstate', 'Statefarm', 'Farmers',
      'Esurance',
      'Encompass',
      'California State Auto Association',
      'Liberty Mutual',
    ]),
    InsCompany: faker.helpers.arrayElement([
      'Allstate', 'Statefarm', 'Farmers',
      'Esurance',
      'Encompass',
      'California State Auto Association',
      'Liberty Mutual',
    ]),
    InsuredName: faker.person.fullName(),
    AdjusterName: faker.helpers.arrayElement(['David Edwards', 'Jordan Peterson']),
    InsAdj: faker.helpers.arrayElement(['David Edwards', 'Jordan Peterson']),
    TechnicianName: faker.helpers.arrayElement(['Bobby James', 'Ricky Nelson']),
    ServiceTech: faker.helpers.arrayElement(['Bobby James', 'Ricky Nelson']),
    City: faker.location.city(),
    State: faker.location.state({ abbreviated: true }),
    PostalCode: faker.location.zipCode(),
    service_area: faker.helpers.arrayElement(['DC Metro', 'Atlanta']),
    service_territory: faker.helpers.arrayElement(['Mid-Atlantic', 'Georgia']),
    provider_id: faker.string.uuid(),
    last_seen: faker.date.between({ from: created_on, to: new Date() }),
    requires_haag: 0,
  }
})
