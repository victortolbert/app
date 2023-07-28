export function usePropertyInspectionForm() {
  const state = useState('pif', () => ({
    lossLocation: '1547 1st Ave\nNew York, NY 10028',
    directionalityNorthOptions: [
      {
        name: 'front',
        value: 'front',
        label: 'Front',
      },
      {
        name: 'back',
        value: 'back',
        label: 'Back',
      },
      {
        name: 'left',
        value: 'left',
        label: 'Left',
      },
      {
        name: 'right',
        value: 'right',
        label: 'Right',
      },
    ],
    directionalityNorth: 'back',
    outsideTemp: '',
    frontRiskPhotoTaken: false,
    insuredPresent: false,
    allstateInspection: false,
    virtualCollaborationSuccessful: false,
    allPhotosTaken: false,
    eagleviewProvided: false,
    ladderAssistIntroduced: false,
    outsideAdjusterPresent: false,
    outsideAdjusterOnRoof: false,
    publicAdjusterPresent: false,
    publicAdjusterOnRoof: false,
    contractorPresent: false,
    contractorOnRoof: false,
    ropeAndHarnessUsed: false,
    tarpInstall: false,
    interiorInspected: true,
    elevationInspected: false,
    roofInspected: false,
    interior: {
      bedroom2: {
        damaged: false,
        damageDescription: '',
        ceiling: {
          damaged: false,
          totalArea: 0,
          areaDamaged: 0,
          dryWallIntegrityOptions: [
            {
              name: 'compromised',
              value: 'compromised',
              label: 'Compromised',
            },
            {
              name: 'notCompromised',
              value: 'notCompromised',
              label: 'Not Compromised',
            },
          ],
          dryWallIntegrity: 'notCompromised',
          textureOptions: [
            {
              name: 'noTexture',
              value: 'noTexture',
              label: 'No Texture',
            },
            {
              name: 'popcorn',
              value: 'popcorn',
              label: 'Acoustic (Popcorn)',
            },
            {
              name: 'knockdown',
              value: 'knockdown',
              label: 'Knockdown',
            },
            {
              name: 'stipple',
              value: 'stipple',
              label: 'Stipple',
            },
          ],
          texture: 'noTexture',
          crownMoldingPresent: false,
          lights: 2,
          fans: 2,
          registerVents: 2,
        },
        walls: {
          damaged: false,
          totalArea: 0,
          textureOptions: ['No Texture', 'Knockdown', 'Stipple'],
          texture: 'Popcorn',
          baseboardsPresent: false,
          wall1: {
            totalArea: 0,
            areaDamaged: true,
            drywallIntegrity: 'Not Compromised',
          },
          wall2: {
            damaged: false,
            totalArea: 0,
            areaDamaged: 0,
            drywallIntegity: 'Not Compromised',
          },
        },
        floors: {
          damaged: false,
          areaDamaged: 0,
          materialOptions: ['Tile', 'Wood', 'Vinyl', 'Carpet'],
          material: 'Carpet',
        },
      },
    },
  }))

  return {
    state,
  }
}
