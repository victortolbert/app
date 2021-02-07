export const namespaced = true

export const state = () => ({
  programs: [
    {
      id: 1,
      name: 'Program Name',
      event_name: 'Event Name',
      archived: 0,
      deleted: 0,
      fun_run: '2021-02-05',
      microsite: {
        school_image_name: 'school-logo.png',
        microsite_color_theme: {
          theme_name: 'default',
        },
      },
      unit_flat_conversion: 0,
      unit: {
        modifier: 'per',
        name: 'Challenge',
      },
      program_pledge_setting: {
        flat_donate_only: 0,
      },
      participants: [
        {
          id: 1,
          first_name: 'Victor',
          last_name: 'Tolbert',
          participant_info: {
            family_pledging_enabled: 1,
            pledges: [
              {
                pledge_status_id: 1,
                amount: 30,
              },
            ],
          },
          profile: {
            image_name: 'victor.jpg',
            pledge_goal: 100,
          },
        },
        {
          id: 2,
          first_name: 'Jeremy',
          last_name: 'Doublestein',
          participant_info: {
            family_pledging_enabled: 1,
            pledges: [
              {
                pledge_status_id: 1,
                amount: 30,
              },
            ],
          },
          profile: {
            image_name: 'jeremy.jpeg',
            pledge_goal: 100,
          },
        },
      ],
    },
  ],
})

export const getters = {
  activePrograms: state => {
    return state.programs.filter(program => {
      return program.archived === 0 && program.deleted === 0
    })
  },
}

export const actions = {}

export const mutations = {}
